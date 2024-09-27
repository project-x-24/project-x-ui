import { useState } from "react";
import Thumbnail from "../../components/thumbnail/Thumbnail";
import TabSwitcher from "../../components/tab-switcher/TabSwitcher";
import SimpleHeader from "../../components/simple-header/SimpleHeader";
import searchIcon from "../../assets/icons/searchIcon.svg";
import { galleryData, tabs } from "../../constants/dummyData";
import { EditRoundedIcon } from "../../assets";
import { ChatIcon } from "../../assets";
import { CallIcon } from "../../assets";
import { VideoIcon } from "../../assets";
import { LeftArrowIcon } from "../../assets";
import { LeftRoundedIcon } from "../../assets";
import { AboutIcon } from "../../assets";

const AvatarProfile = () => {
	const [activeTab, setActiveTab] = useState(tabs[0].value);

	const filteredGalleryData = galleryData.filter((item) => {
		if (activeTab === "All") {
			return true;
		} else {
			return item.type === activeTab;
		}
	});

	const iconShadow = {
		boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.06)",
	};

	return (
		<div className="avatar-profile-container w-full h-screen flex flex-col ">
			<div className="upper-button-container flex items-center justify-between bg-[#F4F4F4] w-full px-[24px] py-[20px]">
				<LeftRoundedIcon />
				<AboutIcon />
			</div>
			<div className="upper-part bg-[#F4F4F4] md:w-[500px] w-full px-[24px] mb-5">
				<div className="middle-profile-picture-container  w-full h-[160px] flex flex-col justify-center  items-center ">
					<div className="profile-picture-container w-[120px] h-[120px] rounded-full relative">
						<img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" className="w-full h-full rounded-full object-cover" />
						<div className="add-profile-picture absolute rounded-full bg-[white] w-[37.5px] h-[37.5px] right-[-3px] bottom-[-3px] ">
							<EditRoundedIcon />
						</div>
					</div>
					<span className="avatar-name text-[18px]">William James</span>
				</div>
				<div className="bottom-buttons-container h-[100px] flex justify-between items-center gap-4">
					<div className="avatar-function-buttons flex-1 h-[84px] rounded-[12px] flex flex-col justify-center items-center bg-white" style={iconShadow}>
						<ChatIcon />
						<span>Chat</span>
					</div>
					<div className="avatar-function-buttons flex-1 h-[84px] rounded-[12px] flex flex-col justify-center items-center bg-white" style={iconShadow}>
						<CallIcon />
						<span>Call</span>
					</div>
					<div className="avatar-function-buttons flex-1 h-[84px] rounded-[12px] flex flex-col justify-center items-center bg-white" style={iconShadow}>
						<VideoIcon />
						<span>Video</span>
					</div>
				</div>
			</div>
			<div className="lower-part-media-container w-full px-[24px]">
				<SimpleHeader title={"Media & Files"} margin={"500"} />
				<TabSwitcher tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

				<div className="grid grid-cols-4 gap-1 mt-4">
					{filteredGalleryData.map((item) => (
						<div key={item.id} className="aspect-square overflow-hidden rounded-[8px]">
							<Thumbnail item={item} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AvatarProfile;
