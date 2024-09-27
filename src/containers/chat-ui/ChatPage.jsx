import { useCallback, useEffect, useState } from 'react';
import {
  LeftArrowIcon,
  MenuIcon,
  SearchIcon,
  SmileIcon,
  AttachmentIcon,
  CameraIcon,
  SendIcon,
  TickIcon,
} from '../../assets';
import EmojiPicker from 'emoji-picker-react';
import { dummyData } from '../../constants/dummyData';
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
import { segmentToChatMessage } from './chat-utils';
import { ChatBubble } from './components/chat-bubble';
import bg from '../../assets/images/call-bg.jpg';
import avatar from '../../assets/images/avatar.jpg';
import audio from '../../assets/images/audio.png';
import speaker from '../../assets/images/speaker.png';
import close from '../../assets/images/close.png';
import { AI_AGENT_LIST } from '../../constants/common';

// const BLAH = [
//   {
//     message: 'Hello. Good afternoon, Bobby.',
//     name: 'Agent',
//     isSelf: false,
//     timestamp: 1727412176139,
//   },
//   {
//     message: 'How can I assist you today? How can I assist you today?How can I assist you today?How can I assist you today?How can I assist you today?',
//     name: 'Agent',
//     isSelf: false,
//     timestamp: 1727412178344,
//   },
//   {
//     name: 'my name',
//     message: 'how are you today',
//     timestamp: 1727412214643,
//     isSelf: true,
//   },
//   {
//     message: "I'm doing well, thank you for asking!",
//     name: 'Agent',
//     isSelf: false,
//     timestamp: 1727412217475,
//   },
//   {
//     message: 'How can I assist you today, Bobby?',
//     name: 'Agent',
//     isSelf: false,
//     timestamp: 1727412220094,
//   },
// ];

// const serverUrl = 'wss://prod-k9bgadix.livekit.cloud';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoibXktcm9vbSIsImNhblB1Ymxpc2giOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblB1Ymxpc2hTb3VyY2VzIjpbXSwiY2FuVXBkYXRlT3duTWV0YWRhdGEiOmZhbHNlLCJpbmdyZXNzQWRtaW4iOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJyZWNvcmRlciI6ZmFsc2UsImFnZW50IjpmYWxzZX0sInNpcCI6eyJhZG1pbiI6ZmFsc2UsImNhbGwiOmZhbHNlfSwiYXR0cmlidXRlcyI6e30sIm1ldGFkYXRhIjoiIiwic2hhMjU2IjoiIiwic3ViIjoiaWRlbnRpdHkiLCJpc3MiOiJBUElMYURYRlo2amNmZ2QiLCJuYmYiOjE3Mjc0MzUxOTksImV4cCI6MTcyNzQ1Njc5OX0.z4F_IFABGISYZOeh0bcy7ilkIlIT2CltJilaBJwAI50';

function ChatPage() {
  const [replyingTo, setReplyingTo] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(dummyData);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const [isVoice, setIsVoice] = useState(false);
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);
  const [activePersona, setActivePersona] = useState(AI_AGENT_LIST[0]);

  return (
    <LayoutContextProvider>
      <div className="flex flex-col h-screen w-screen">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 bg-white shadow-md">
          <div className="flex">
            <button className="text-xl">
              <LeftArrowIcon />
            </button>
            <div
              className="flex w-full last:relative items-center"
              onClick={() => setShowPersonaDropdown((prev) => !prev)}
            >
              <img
                alt=""
                src={activePersona.imageSrc}
                className="rounded-full w-10 h-10 ml-3 object-cover"
              />
              <div className="ml-3 flex-grow">
                <p className="font-bold">{activePersona.persona}</p>
              </div>
              {showPersonaDropdown && (
                <div className="flex flex-col absolute top-[60px] z-50 bg-white rounded-lg px-3 py-2 gap-2 min-w-[75vw]">
                  {AI_AGENT_LIST?.map((item) => (
                    <div
                      key={item.persona}
                      onClick={() => setActivePersona(item)}
                      className="flex justify-between w-full"
                    >
                      <div className="flex justify-start gap-3 items-center">
                        <img
                          alt=""
                          src={activePersona.imageSrc}
                          className="rounded-full w-10 h-10 ml-3 object-cover"
                        />
                        <p>{item.persona}</p>
                      </div>
                      {activePersona.id === item.id && <TickIcon />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="right-buttons-container">
            <div
              className="w-full text-center cursor-pointer"
              onClick={() => {
                setIsVoice(!isVoice);
              }}
            >
              {isVoice ? 'VOICE' : 'CHAT'}
            </div>
            <button className="text-xl">
              <SearchIcon />
            </button>
            <button className="text-xl ml-[20px]">
              <MenuIcon />
            </button>
          </div>
        </div>
        <LiveKitRoom
          token={activePersona.token}
          serverUrl={activePersona.serverUrl}
          connectOptions={{ autoSubscribe: true }}
        >
          <ActiveRoom
            isVoice={isVoice}
            setIsVoice={setIsVoice}
            ActivePersona={activePersona}
          />
        </LiveKitRoom>
      </div>
    </LayoutContextProvider>
  );
}

const ActiveRoom = ({ ActivePersona, isVoice, setIsVoice }) => {
  const voiceAssistant = useVoiceAssistant();

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

  console.log(messages);

  // temp
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSendMessage = () => {
    if (messageText.length > 0) {
      sendChat(messageText);
      setMessageText('');
    }
    // setIsEmojiOpen(false);
    // if (!messageText) return;
    // const newMessage = {
    //   id: messages.length + 1,
    //   sender: 'me',
    //   type: 'text',
    //   content: messageText,
    //   time: new Date().toLocaleTimeString([], {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //   }),
    // };
    // setMessages([...messages, newMessage]);
    // setMessageText('');
    // setReplyingTo(null); // Clear reply after sending
  };

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
          name = 'Agent';
        } else if (isSelf) {
          name = 'You';
        } else {
          name = 'Unknown';
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

  const { isMicrophoneEnabled } = localParticipant;

  return (
    <>
      <RoomAudioRenderer muted={!isVoice} />
      {isVoice && (
        <main
          className="w-screen h-screen fixed inset-0 z-10"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="h-full flex flex-col items-center relative">
            <div className="text-black text-[32px] font-normal mt-[140px]">
              {ActivePersona.persona}
            </div>
            <div className="text-[#656464A8] opacity-[0.6] text-[21px] font-normal mt-[1px]">
              {ActivePersona.token ? 'Connected' : 'Connecting...'}
            </div>
            <img
              src={ActivePersona.imageSrc}
              className="rounded-full w-[172px] h-[172px] object-cover mt-[26px]"
            />

            <div className="absolute bg-white w-full h-[94px] rounded-t-[9px] bottom-0">
              <div className="flex gap-[24px] w-full h-full items-center justify-center">
                {/* <img className="cursor-pointer" src={video} /> */}
                <img
                  className="cursor-pointer"
                  src={isMicrophoneEnabled ? audio : speaker}
                  onClick={() => {
                    localParticipant?.localParticipant?.setMicrophoneEnabled(
                      !isMicrophoneEnabled
                    );
                  }}
                />
                {/* <img className="cursor-pointer" src={speaker} /> */}
                <img
                  className="cursor-pointer"
                  src={close}
                  onClick={() => {
                    setIsVoice(false);
                  }}
                />
              </div>
            </div>
          </div>
        </main>
      )}
      <div className="relative flex flex-col h-[calc(100vh-74px)]">
        <div className=" flex-grow flex flex-col w-full bg-gray-100 overflow-y-auto">
          <div className="flex flex-col h-[calc(100%-74px)] overflow-auto p-3">
            {messages.map((message) => (
              <ChatBubble key={message.timestamp} message={message} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 flex flex-col w-screen p-3 items-center bg-white shadow-md">
          <EmojiPicker
            open={isEmojiOpen}
            width={'100%'}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(e) => setMessageText((prev) => prev + e.emoji)}
            searchDisabled={true}
          />
          <div className="flex w-screen p-3 items-center">
            <div className="flex w-full p-2 rounded-full bg-gray-100 outline-none">
              <input
                type="text"
                placeholder="Message..."
                className="bg-gray-100 outline-none w-full pd-l-2"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                    e.preventDefault();
                  }
                }}
              />
              <div className="right-buttons-container flex">
                <button className="text-gray-500 mr-3">
                  <SmileIcon onClick={() => setIsEmojiOpen(!isEmojiOpen)} />
                </button>
                <button className="text-xl text-gray-500 mr-3">
                  <AttachmentIcon />
                </button>
                <button className="text-xl text-gray-500 mr-3">
                  <CameraIcon />
                </button>
              </div>
            </div>
            <button
              className="text-xl text-blue-500"
              onClick={handleSendMessage}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
