import {
  Chat,
  LayoutContextProvider,
  LiveKitRoom,
  RoomAudioRenderer,
  useChat,
  useDataChannel,
  useLocalParticipant,
  useTrackTranscription,
  useVoiceAssistant,
} from '@livekit/components-react';
import { LocalParticipant, Track } from 'livekit-client';
import { useCallback, useEffect, useState } from 'react';

const serverUrl = 'wss://demo-app-llkt0pq2.livekit.cloud';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjc2OTc1NTAsImlzcyI6IkFQSWl0bUM1OHpSRUN6OSIsIm5hbWUiOiJ0ZXN0X3VzZXIiLCJuYmYiOjE3MjczNTE5NTAsInN1YiI6InRlc3RfdXNlciIsInZpZGVvIjp7InJvb20iOiJ0ZXN0X3Jvb20iLCJyb29tSm9pbiI6dHJ1ZX19.Nu8Ci5L9MdlYyQQ6iS7UoZndCmFNC3NSxwfbAYeW3F0';

export const TestChat = () => {
  return (
    <LayoutContextProvider>
      <div>
        chat
        <LiveKitRoom
          serverUrl={serverUrl}
          token={token}
          connectOptions={{ autoSubscribe: true }}
        >
          <ActiveRoom />
        </LiveKitRoom>
      </div>
    </LayoutContextProvider>
  );
};

const ActiveRoom = () => {
  // const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const voiceAssistant = useVoiceAssistant();

  // console.log('------', voiceAssistant)
  // const agentMessages = useTrackTranscription(voiceAssistant?.audioTrack);

  // agentMessages?.segments?.forEach((message) => {
  //   console.log('this is the message', message);
  // });

  // const { chatMessages, send } =  useChat();

  useEffect(() => {
    setTimeout(() => {
      // localParticipant?.
      // send('Hello');
    }, 2000);
  }, []);

  // console.log(chatMessages)

  const agentAudioTrack = voiceAssistant?.audioTrack;
  const agentMessages = useTrackTranscription(agentAudioTrack);
  const localParticipant = useLocalParticipant();
  const localMessages = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [transcripts, setTranscripts] = useState(new Map());
  const [messages, setMessages] = useState([]);
  const { chatMessages, send: sendChat } = useChat();

  console.log(messages)

  // store transcripts
  useEffect(() => {
    agentMessages.segments.forEach((s) =>
      transcripts.set(
        s.id,
        segmentToChatMessage(
          s,
          transcripts.get(s.id),
          agentAudioTrack.participant
        )
      )
    );
    localMessages.segments.forEach((s) =>
      transcripts.set(
        s.id,
        segmentToChatMessage(
          s,
          transcripts.get(s.id),
          localParticipant.localParticipant
        )
      )
    );
    const allMessages = Array.from(transcripts.values());
    for (const msg of chatMessages) {
      const isAgent =
        msg.from?.identity === agentAudioTrack.participant?.identity;
      const isSelf =
        msg.from?.identity === localParticipant.localParticipant.identity;
      let name = msg.from?.name;
      if (!name) {
        if (isAgent) {
          name = "Agent";
        } else if (isSelf) {
          name = "You";
        } else {
          name = "Unknown";
        }
      }
      allMessages.push({
        name,
        message: msg.message,
        timestamp: msg.timestamp,
        isSelf: isSelf,
      });
    }
    allMessages.sort((a, b) => a.timestamp - b.timestamp);
    setMessages(allMessages);
  }, [
    transcripts,
    chatMessages,
    localParticipant.localParticipant,
    agentAudioTrack?.participant,
    agentMessages.segments,
    localMessages.segments,
  ]);

  return (
    <>
      <RoomAudioRenderer />
      <Chat />
      <button
        onClick={() => {
          localParticipant?.localParticipant?.setMicrophoneEnabled(
            !localParticipant?.localParticipant?.isMicrophoneEnabled
          );
        }}
      >
        Toggle Microphone
      </button>
      <div>
        Audio Enabled:{' '}
        {localParticipant?.localParticipant?.isMicrophoneEnabled
          ? 'Unmuted'
          : 'Muted'}
      </div>
    </>
  );
};

function segmentToChatMessage(s, existingMessage, participant) {
  const msg = {
    message: s.final ? s.text : `${s.text} ...`,
    name: participant instanceof LocalParticipant ? 'You' : 'Agent',
    isSelf: participant instanceof LocalParticipant,
    timestamp: existingMessage?.timestamp ?? Date.now(),
  };
  return msg;
}
