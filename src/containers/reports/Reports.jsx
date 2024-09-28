import { useState } from "react";
import {
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
  ReportsFilter,
} from "../../assets";

import DailyActivity from "../../assets/images/dailyActivity.png";
import Stats from "../../assets/images/overallStatistics.png";
import BottomTab from "../../components/bottom-tab/BottomTab";
import ReactPlayer from "react-player";
import MemoryLaneVideo from "../../assets/videos/memoryLane.mp4"

const Reports = () => {
  const [activeEmoji, setActiveEmoji] = useState("happy");

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

  const [showVideo, setShowVideo] = useState(false);

  return (
    
   !showVideo ? (<>
    <div className="h-[calc(100vh-78px)] overflow-auto p-6 w-screen bg-white">
      {/* Greeting */}
      <div className="text-[18px] leading-7 font-[500] mb-6">Hi there 👋</div>

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
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-[16px] font-500">Daily Report</p>
          <ReportsFilter />
        </div>
        <img
          src={DailyActivity}
          className="rounded-xl w-full object-cover mt-[26px]"
        />
        <img src={Stats} className="rounded-xl w-full object-cover mt-[26px]" />
      </div>
    </div>
    <BottomTab activeTab={"reports"} setShowVideo={setShowVideo}/>
    </>) : (
        <ReactPlayer
          muted
          playing
          playsinline
          width="100%"
          height="100%"
          url={MemoryLaneVideo}

        />
      )
  );
};

export default Reports;
