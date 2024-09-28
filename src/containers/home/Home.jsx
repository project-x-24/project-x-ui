import { useNavigate } from "react-router-dom";
import {
  MemoryBg,
  StarIcon,
  PaperClip,
  ClockIcon,
  SmileActive,
  SadActive,
  AngryActive,
  DumbActive,
  HappyActive,
  SmileInactive,
  HappyInactive,
  SadInactive,
  AngryInactive,
  DumbInactive,
} from "../../assets";
import { FaceAssistBg } from "../../assets";
import { VoiceAssistBg } from "../../assets";
import { ChatBg } from "../../assets";
import { RightIcon } from "../../assets";
import BottomTab from "../../components/bottom-tab/BottomTab";
import { useEffect, useState } from "react";
import { getTodoList } from "./api";

import MemoryLaneVideo from "../../assets/videos/memoryLane.mp4";
import ReactPlayer from "react-player";
import Header from "../../components/header/Header";

function HomePage({ name }) {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    (async () => {
      const resp = await getTodoList();

      setNotes(resp?.items ?? []);
    })();
  }, []);

  const categories = [
    {
      name: "Chat",
      bgStyle: "bg-gradient-to-r from-[#7dc8e7] to-[#7dc8e7b0]",
      icon: <ChatBg />,
      route: "/add-person",
      disabled: false,
    },
    {
      name: "Memory Games",
      bgStyle: "bg-gradient-to-r from-[#7D88E7] to-[#8C96F0A3]",
      icon: <MemoryBg />,
      route: "/chat/5",
      disabled: false,
    },
    {
      name: "Voice Assist",
      bgStyle: "bg-gradient-to-r from-[#E77D7D] to-[#E77D7DB5]",
      icon: <VoiceAssistBg />,
      route: "/chat/6",
      disabled: false,
    },
    {
      name: "Face Assist",
      bgStyle: "bg-gradient-to-r from-[#498A5B] to-[#7ACB90]",
      icon: <FaceAssistBg />,
      route: "/camera-assist",
      disabled: false,
    },
  ];
  const emotions = [
    { name: "sad", activeIcon: <SadActive />, inactiveIcon: <SadInactive /> },
    {
      name: "angry",
      activeIcon: <AngryActive />,
      inactiveIcon: <AngryInactive />,
    },
    {
      name: "happy",
      activeIcon: <HappyActive />,
      inactiveIcon: <HappyInactive />,
    },
    {
      name: "dumb",
      activeIcon: <DumbActive />,
      inactiveIcon: <DumbInactive />,
    },
    {
      name: "smile",
      activeIcon: <SmileActive />,
      inactiveIcon: <SmileInactive />,
    },
  ];

  const [activeEmoji, setActiveEmoji] = useState("happy");
  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <>
      {!showVideo ? (
        <div className="flex flex-col">
		
		<Header/>
          <div className="h-[calc(100vh-78px)] overflow-auto p-6 w-screen bg-white">
            {/* Greeting */}
            <div className="text-[18px] leading-7 font-[500] mb-6">
              Hi {name},
            </div>

            {/* Emoji & Question */}
            <div className="mb-7 flex flex-col border-[1px] p-6 rounded-[12px] border-[#EB5017] items-center">
              <h2 className="text-[16px] font-[500] w-full mb-4">
                How are you feeling today?
              </h2>
              <div className="flex space-x-4">
                {emotions.map((emotion) => (
                  <div
                    key={emotion.name}
                    onClick={() => setActiveEmoji(emotion.name)}
                    className={`cursor-pointer rounded-full  p-1 transition-transform duration-150 ${
                      activeEmoji === emotion.name
                        ? "transform scale-110 border-2 border-red-500"
                        : "border-2 border-gray-200"
                    }`}
                  >
                    {activeEmoji === emotion.name
                      ? emotion.activeIcon
                      : emotion.inactiveIcon}
                  </div>
                ))}
              </div>
              <span className="text-[14px] text-[#969696] my-4">
                Tap to share your mood
              </span>
            </div>

            {/* Categories */}
            <span className="text-[16px] font-[500] text-[#1C1C1C]">
              Categories
            </span>
            <div className="grid grid-cols-2 gap-4 mt-3 mb-7">
              {categories.map((category, index) => (
                <div
                  onClick={() => {
                    if (category.disabled) return;

                    navigate(category.route);
                  }}
                  key={index}
                  className={`p-16 rounded-[14px] h-[163px] shadow-md flex flex-col justify-center items-center relative font-bold text-center text-white ${category.bgStyle}`}
                >
                  {/* Custom Icon for each category */}
                  <div className="mb-4 absolute top-0 left-0 overflow-hidden">
                    {category.icon}
                  </div>
                  <div className="absolute bottom-[16px] flex justify-between items-center w-full px-6">
                    <span className="text-[18px] text-left font-[500]">
                      {category.name}
                    </span>
                    <RightIcon />
                  </div>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div>
              <span className="text-[16px] font-[500] mb-4 block">To Do</span>
            </div>
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md"
                  style={{ boxShadow: "0px 4px 4px 0px #00000014" }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[14px] mb-2">{note.event}</span>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <ClockIcon />
                      <span className="text-[14px] h-5 text-[#98A2B3] align-middle font-[400] ml-1">
                        {note.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-end">
                      <button className="flex items-center">
                        <StarIcon />
                      </button>
                      <button className="flex items-center ml-1">
                        <PaperClip />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomTab activeTab={"home"} setShowVideo={setShowVideo} />
        </div>
      ) : (
        <ReactPlayer
          muted
          playing
          playsinline
          width="100%"
          height="100%"
          url={MemoryLaneVideo}
          onEnded={handleVideoEnd}
        />
      )}
    </>
  );
}

export default HomePage;
