import { useEffect, useState } from "react";
import Thumbnail from "../../components/thumbnail/Thumbnail";
import TabSwitcher from "../../components/tab-switcher/TabSwitcher";
import SimpleHeader from "../../components/simple-header/SimpleHeader";
import { galleryData, tabs } from "../../constants/dummyData";
import { EditRoundedIcon } from "../../assets";
import { LeftArrowIcon } from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
import { AI_AGENT_LIST } from "../../constants/common";
import ReactPlayer from "react-player";

import onboardingVideo from "../../assets/images/onboarding.mp4";

const AvatarProfile = () => {
  const params = useParams();
  const personId = params.id;
  const [showVideo, setShowVideo] = useState(false);

  const navigate = useNavigate();

  const handleOnBackButtonClick = () => {
    navigate(-1);
  };

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    console.log({ personId });
    if (personId) {
      setProfileData(AI_AGENT_LIST?.find((item) => item.id === personId));
    }
  }, [personId]);

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const filteredGalleryData = galleryData.filter((item) => {
    if (activeTab === "All") {
      return true;
    } else {
      return item.type === activeTab;
    }
  });

  return (
    <div className="avatar-profile-container w-full h-screen items-center flex flex-col bg-white ">
      {!showVideo ? (
        <>
          <div className="upper-button-container flex items-center justify-start w-full px-[24px] py-[20px] gap-4">
            <button onClick={handleOnBackButtonClick}>
              <LeftArrowIcon />
            </button>
            <p className="flex font-bold text-base">Profile</p>
          </div>
          <div className="upper-part md:w-[500px] w-full px-[24px] mb-5">
            <div className="middle-profile-picture-container  w-full h-[160px] flex flex-col justify-center  items-center ">
              <div className="profile-picture-container w-[120px] h-[120px] rounded-full relative">
                <img
                  src={profileData?.imageSrc}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="add-profile-picture absolute rounded-full bg-[white] w-[37.5px] h-[37.5px] right-[-3px] bottom-[-3px] ">
                  <EditRoundedIcon />
                </div>
              </div>
              <span className="avatar-name text-[18px] font-bold">
                {profileData?.persona}
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center bg-[#EB5017] rounded-lg text-white m-6 px-4 py-2 w-fit"
            onClick={() => setShowVideo(true)}
          >
            Unlock Core Memory
          </button>
          <div className="lower-part-media-container w-full px-[24px]">
            <SimpleHeader title={"Media & Files"} margin={"500"} />
            <TabSwitcher
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="grid grid-cols-4 gap-1 mt-4">
              {filteredGalleryData.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square overflow-hidden rounded-[8px]"
                >
                  <Thumbnail item={item} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <ReactPlayer
          muted
          playing
          playsinline
          width="100%"
          height="100%"
          url={onboardingVideo}
        />
      )}
    </div>
  );
};

export default AvatarProfile;
