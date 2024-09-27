import { useCallback, useEffect, useState } from 'react';
import {
  LeftArrowIcon,
  MenuIcon,
  SearchIcon,
  SmileIcon,
  AttachmentIcon,
  CameraIcon,
  SendIcon,
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
import { segmentToChatMessage } from '../../containers/chat-ui/chat-utils';

const serverUrl = 'wss://projectx-2ef20wul.livekit.cloud';
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoibXktcm9vbSIsImNhblB1Ymxpc2giOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblB1Ymxpc2hTb3VyY2VzIjpbXSwiY2FuVXBkYXRlT3duTWV0YWRhdGEiOmZhbHNlLCJpbmdyZXNzQWRtaW4iOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJyZWNvcmRlciI6ZmFsc2UsImFnZW50IjpmYWxzZX0sInNpcCI6eyJhZG1pbiI6ZmFsc2UsImNhbGwiOmZhbHNlfSwiYXR0cmlidXRlcyI6e30sIm1ldGFkYXRhIjoiIiwic2hhMjU2IjoiIiwic3ViIjoiaWRlbnRpdHkiLCJpc3MiOiJBUEk0cUNCWHQ4R2NXdEQiLCJuYmYiOjE3Mjc0MTIwNTYsImV4cCI6MTcyNzQzMzY1Nn0.GNr3wBcDcZPWVGHsPc2HKW_pC28FGHBXClvNN5yi2bI';

function ChatPage() {
  const [messages, setMessages] = useState(dummyData);
  const [replyingTo, setReplyingTo] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const handleSendMessage = () => {
    setIsEmojiOpen(false);

    if (!messageText) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      type: 'text',
      content: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
    setReplyingTo(null); // Clear reply after sending
  };

  return (
    <LayoutContextProvider>
      <LiveKitRoom
        serverUrl={serverUrl}
        token={token}
        connectOptions={{ autoSubscribe: true }}
      >
        <ActiveRoom />
      </LiveKitRoom>
      <div className="flex flex-col h-screen w-screen">
        {/* Chat Header */}
        <div className="flex items-center p-3 bg-white shadow-md">
          <button className="text-xl">
            <LeftArrowIcon />
          </button>
          <img
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
            alt="Profile"
            className="rounded-full w-10 h-10 ml-3 object-cover"
          />
          <div className="ml-3 flex-grow">
            <p className="font-bold">GrandPa</p>
          </div>
          <div className="right-buttons-container">
            <button className="text-xl">
              <SearchIcon />
            </button>
            <button className="text-xl ml-[20px]">
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-grow flex flex-col w-full p-3 bg-gray-100 overflow-y-auto">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex flex-col w-screen p-3 items-center bg-white shadow-md">
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
    </LayoutContextProvider>
  );
}

const ChatBubble = ({ message }) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`max-w-[70%] min-w-[150px] p-2 my-2  ${
          message.sender === 'me'
            ? 'bg-[#EB5017] text-[white] rounded-[16px] rounded-br-[0px] flex flex-col self-end'
            : 'bg-white flex flex-col rounded-[16px] rounded-bl-[0px] self-start text-left'
        }`}
      >
        {message.type === 'text' && <p>{message.content}</p>}
        {message.type === 'image' && (
          <img src={message.content} alt="Sent media" className="rounded-lg" />
        )}
        {message.type === 'audio' && (
          <audio controls className="w-full">
            <source src={message.content} type="audio/mpeg" />
          </audio>
        )}
        <span
          className={`text-xs  ${
            message.sender === 'me' ? 'text-[white]-500' : 'text-gray-500'
          } text-right`}
        >
          {message.time}
        </span>
      </div>
    </div>
  );
};

const ActiveRoom = () => {
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
};

export default ChatPage;
