import { useEffect, useState } from "react";
import {
  LeftArrowIcon,
  SmileIcon,
  AttachmentIcon,
  CameraIcon,
  SendIcon,
  SettingsIcon,
} from "../../assets";
import EmojiPicker from "emoji-picker-react";
import { dummyData } from "../../constants/dummyData";
import {
  LayoutContextProvider,
  LiveKitRoom,
  RoomAudioRenderer,
  useChat,
  useLocalParticipant,
  useTrackTranscription,
  useVoiceAssistant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { segmentToChatMessage } from "./chat-utils";
import { ChatBubble } from "./components/chat-bubble";
import bg from "../../assets/images/call-bg.jpg";
import audio from "../../assets/images/audio.png";
import audio1 from "../../assets/images/audio1.png";
import close from "../../assets/images/close.png";
import call from "../../assets/images/call.png";

import { VoiceOverlay } from "./components/voice-overlay";
import { AI_AGENT_LIST } from "../../constants/common";
import { useNavigate, useParams } from "react-router-dom";

// const BLAH = [
//   {
//     message: "Hello. Good afternoon, Bobby.",
//     name: "Agent",
//     isSelf: false,
//     timestamp: 1727412176139,
//   },
//   {
//     message:
//       "How can I assist you today? How can I assist you today?How can I assist you today?How can I assist you today?How can I assist you today?",
//     name: "Agent",
//     isSelf: false,
//     timestamp: 1727412178344,
//   },
//   {
//     name: "my name",
//     message: "how are you today",
//     timestamp: 1727412214643,
//     isSelf: true,
//   },
//   {
//     message: "I'm doing well, thank you for asking!",
//     name: "Agent",
//     isSelf: false,
//     timestamp: 1727412217475,
//   },
//   {
//     message: "How can I assist you today, Bobby?",
//     name: "Agent",
//     isSelf: false,
//     timestamp: 1727412220094,
//   },
// ];

// const serverUrl = 'wss://prod-k9bgadix.livekit.cloud';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IiIsIm5hbWUiOiJteSBuYW1lIiwidmlkZW8iOnsicm9vbUNyZWF0ZSI6ZmFsc2UsInJvb21MaXN0IjpmYWxzZSwicm9vbVJlY29yZCI6ZmFsc2UsInJvb21BZG1pbiI6ZmFsc2UsInJvb21Kb2luIjp0cnVlLCJyb29tIjoibXktcm9vbSIsImNhblB1Ymxpc2giOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblB1Ymxpc2hTb3VyY2VzIjpbXSwiY2FuVXBkYXRlT3duTWV0YWRhdGEiOmZhbHNlLCJpbmdyZXNzQWRtaW4iOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJyZWNvcmRlciI6ZmFsc2UsImFnZW50IjpmYWxzZX0sInNpcCI6eyJhZG1pbiI6ZmFsc2UsImNhbGwiOmZhbHNlfSwiYXR0cmlidXRlcyI6e30sIm1ldGFkYXRhIjoiIiwic2hhMjU2IjoiIiwic3ViIjoiaWRlbnRpdHkiLCJpc3MiOiJBUElMYURYRlo2amNmZ2QiLCJuYmYiOjE3Mjc0MzUxOTksImV4cCI6MTcyNzQ1Njc5OX0.z4F_IFABGISYZOeh0bcy7ilkIlIT2CltJilaBJwAI50';

// configure with route

function ChatPage() {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const [isVoice, setIsVoice] = useState(false);
  const [activePersona, setActivePersona] = useState(null);

  const params = useParams();
  const personId = params.id;
  const isVoiceAgent = personId === "6";

  const navigate = useNavigate();

  const handleOnBackButtonClick = () => {
    navigate(-1);
  };

  const handleSettingsClick = () => {
    navigate(`/profile/${personId}`);
  };

  useEffect(() => {
    if (personId) {
      console.log({ personId, params });
      setActivePersona(AI_AGENT_LIST?.find((item) => item.id === personId));
    }
  }, [personId]);

  console.info(activePersona?.token)

  return (
    <LayoutContextProvider>
      <div className="flex flex-col h-screen w-screen">
        {/* Chat Header */}
        <div className="flex items-center justify-between py-3 px-[24px] bg-white shadow-md border-b border-[#F4F4F4]">
          <div className="flex">
            <button className="text-xl" onClick={handleOnBackButtonClick}>
              <LeftArrowIcon />
            </button>
            <div className="flex w-full last:relative items-center">
              <img
                alt=""
                src={activePersona?.imageSrc}
                className="rounded-full w-10 h-10 ml-3 object-cover"
              />
              <div className="ml-3 flex-grow">
                <p className="font-bold text-[rgba(16,25,40,1)]">
                  {activePersona?.persona}
                </p>
              </div>
            </div>
          </div>
          <div className="right-buttons-container flex gap-[24px]">
            <img
              className="w-[24px] h-[24px]"
              src={call}
              onClick={() => {
                setIsVoice(!isVoice);
              }}
            />
            <SettingsIcon fill="#98A2B3" onClick={handleSettingsClick} />
          </div>
        </div>
        <LiveKitRoom
          token={activePersona?.token}
          serverUrl={activePersona?.serverUrl}
          connectOptions={{ autoSubscribe: true }}
        >
          <ActiveRoom
            isVoice={isVoice}
            setIsVoice={setIsVoice}
            ActivePersona={activePersona}
            isVoiceAgent={isVoiceAgent}
          />
        </LiveKitRoom>
      </div>
    </LayoutContextProvider>
  );
}

const ActiveRoom = ({ ActivePersona, isVoice, setIsVoice, isVoiceAgent }) => {
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
  const [messageText, setMessageText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSendMessage = () => {
    if (messageText.length > 0) {
      sendChat(messageText);
      setMessageText("");
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

  const { isMicrophoneEnabled } = localParticipant;

  const navigate = useNavigate();

  // TODO: check if this works or not
  // useEffect(() => {
  //   if (isVoice) {
  //     localParticipant?.localParticipant?.setMicrophoneEnabled?.(true);
  //   }
  // }, [isVoice]);

  return (
    <>
      <RoomAudioRenderer muted={!isVoice} />
      {isVoiceAgent && (
        <VoiceOverlay
          onClick={() => {
            setIsVoice(true);
            localParticipant?.localParticipant?.setMicrophoneEnabled(
              !isMicrophoneEnabled
            );
          }}
          onClose={() => {
            setIsVoice(false);
            localParticipant?.localParticipant?.setMicrophoneEnabled(false);
            navigate("/home");
            // re route to home page
          }}
        />
      )}
      {isVoice && (
        <main
          className="w-screen h-screen fixed inset-0 z-10"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="h-full flex flex-col items-center relative">
            <div className="text-black text-[32px] font-normal mt-[140px]">
              {ActivePersona?.persona}
            </div>
            <div className="text-[#656464A8] opacity-[0.6] text-[21px] font-normal mt-[1px]">
              {ActivePersona?.token ? "Connected" : "Connecting..."}
            </div>
            <img
              src={ActivePersona?.imageSrc}
              className="rounded-full w-[172px] h-[172px] object-cover mt-[26px]"
            />

            <div className="absolute bg-white w-full h-[94px] rounded-t-[9px] bottom-0">
              <div className="flex gap-[24px] w-full h-full items-center justify-center">
                {/* <img className="cursor-pointer" src={video} /> */}
                <img
                  className="cursor-pointer"
                  src={isMicrophoneEnabled ? audio1 : audio}
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
        <div className="w-full text-center capitalize">{voiceAssistant.state}</div>
        <div className=" flex-grow flex flex-col w-full bg-white overflow-y-auto">
          <div className="flex flex-col h-[calc(100%-74px)] overflow-auto p-3">
            {messages.map((message) => (
              <ChatBubble key={message.timestamp} message={message} />
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 flex flex-col w-screen p-3 items-center bg-white"
          style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.12)" }}
        >
          <EmojiPicker
            open={isEmojiOpen}
            width={"100%"}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(e) => setMessageText((prev) => prev + e.emoji)}
            searchDisabled={true}
          />
          {/* Fix styles */}
          <div className="flex w-screen p-3 items-center">
            <div className="flex w-full p-2 h-[46px] rounded-full bg-white border border-[#98A2B3] outline-none">
              <input
                type="text"
                placeholder="Type your message"
                className="bg-white text-[#1E1E1E] placeholder-[#98A2B3] outline-none w-full pd-l-2"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
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
            <button onClick={handleSendMessage} className="ml-[12px]">
              <SendIcon className="w-[27px] h-[27px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
