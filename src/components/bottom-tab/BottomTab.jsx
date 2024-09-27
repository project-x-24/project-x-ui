import { HomeIcon, PieIcon, MemoryIcon } from "../../assets";

const BottomTab = ({ activeTab }) => {

  const tabShadow = {
		boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.12)"
	};

  return (
    <div className="fixed bottom-0 w-full bg-white" style={tabShadow}>
      <div className="flex justify-between text-center">
        <div className="flex-1 flex flex-col justify-center items-center p-4 text-[12px]">
          <HomeIcon className={`${activeTab === "home" ? "fill-[#EB5017]" : "fill-[#98A2B3]"}`} />
          <span className={`mt-1 ${activeTab === "home" ? "text-[#EB5017]" : "text-[#98A2B3]"}`}>Home</span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-4 text-[12px]">
          <PieIcon className={`${activeTab === "reports" ? "fill-[#EB5017]" : "fill-[#98A2B3]"}`} />
          <span className={`mt-1 ${activeTab === "reports" ? "text-[#EB5017]" : "text-[#98A2B3]"}`}>Reports</span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-4 text-[12px]">
          <MemoryIcon className={`${activeTab === "memory" ? "fill-[#EB5017]" : "fill-[#98A2B3]"}`} />
          <span className={`mt-1 ${activeTab === "memory" ? "text-[#EB5017]" : "text-[#98A2B3]"}`}>Memory Lane</span>
        </div>
      </div>
    </div>
  );
};

export default BottomTab;
