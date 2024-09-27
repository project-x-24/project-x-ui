
const Tab = ({ active, title, onClick, isStart, isEnd }) => {
  console.log(isStart)
  return (
    <div
      className={`px-4 py-2 text-center cursor-pointer w-[88px] ${active ? 'bg-[#EB5017] text-white' : 'text-gray-600 border'} ${isStart ? 'rounded-l-[8px]' : ''} ${isEnd ? 'rounded-r-[8px]' : ''} `}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const TabSwitcher = ({ tabs,  activeTab, setActiveTab }) => {

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          active={activeTab === tab.value}
          title={tab.title}
          onClick={() => handleTabClick(tab.value)}
          isStart={tabs[0] === tab}
          isEnd={tabs[tabs.length - 1] === tab}
        />
      ))}
    </div>
  );
};

export default TabSwitcher;