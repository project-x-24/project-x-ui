
const Tab = ({ active, title, onClick }) => {
  return (
    <div
      className={`px-4 py-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
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
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          active={activeTab === tab.value}
          title={tab.title}
          onClick={() => handleTabClick(tab.value)}
        />
      ))}
    </div>
  );
};

export default TabSwitcher;