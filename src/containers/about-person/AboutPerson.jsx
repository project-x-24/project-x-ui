import { useState } from "react";
import CustomTextArea from "../../components/custom-text-area/customTextArea";
import SimpleHeader from "../../components/simple-header/SimpleHeader";
import TabSwitcher from "../../components/tab-switcher/TabSwitcher";
import Thumbnail from "../../components/thumbnail/Thumbnail";
import IconUrl from  "../../assets/icons/roundedTick.svg";
import { galleryData, tabs } from "../../constants/dummyData";

const AboutPerson = () => {

    

    const [activeTab, setActiveTab] = useState(tabs[0].value);
    
    const description = "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur."

	const filteredGalleryData = galleryData.filter((item) => {
		if (activeTab === "All") {
			return true;
		} else {
			return item.type === activeTab;
		}
	});


  return (
    <div className="about-person-container w-full h-screen">
        <div className="upper-button-container w-full h-[56px] px-[24px]"></div>
        <div className="description-container px-[24px]">
            <SimpleHeader title={"Description"} iconUrl={IconUrl}/>
            <CustomTextArea value={description}/>
            <SimpleHeader title={"Uploaded File"} iconUrl={IconUrl}/>
            <TabSwitcher tabs={tabs}  activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className="grid grid-cols-4 mt-4 gap-3">
					{filteredGalleryData.map((item) => (
						<div key={item.id} className="w-[77px] h-[74px] overflow-hidden">
							<Thumbnail item={item} />
						</div>
					))}
				</div>

        </div>

    </div>
  );
};

export default AboutPerson;