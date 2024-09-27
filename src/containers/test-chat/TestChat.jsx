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

const serverUrl = 'wss://projectx-2ef20wul.livekit.cloud';
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoibXktcm9vbSIsImNhblB1Ymxpc2giOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblB1Ymxpc2hTb3VyY2VzIjpbXSwiY2FuVXBkYXRlT3duTWV0YWRhdGEiOmZhbHNlLCJpbmdyZXNzQWRtaW4iOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJyZWNvcmRlciI6ZmFsc2UsImFnZW50IjpmYWxzZX0sInNpcCI6eyJhZG1pbiI6ZmFsc2UsImNhbGwiOmZhbHNlfSwiYXR0cmlidXRlcyI6e30sIm1ldGFkYXRhIjoiIiwic2hhMjU2IjoiIiwic3ViIjoiaWRlbnRpdHkiLCJpc3MiOiJBUEk0cUNCWHQ4R2NXdEQiLCJuYmYiOjE3Mjc0MTIwNTYsImV4cCI6MTcyNzQzMzY1Nn0.GNr3wBcDcZPWVGHsPc2HKW_pC28FGHBXClvNN5yi2bI';

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


  // useEffect(() => {
  //   setTimeout(() => {
  //     // localParticipant?.
  //     send('Hello my name is rithwik');
  //   }, 2000);
  // }, []);

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
