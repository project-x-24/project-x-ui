
const SimpleHeader = ({title, iconUrl}) => {
  return (
    <div className="w-full flex items-center py-[10px] relative">
      <h1 className="simple-header">{title}</h1>
      {iconUrl && <img className="action-button absolute right-[10px]" src={iconUrl} alt="icon"/>}
    </div>
  );
};

export default SimpleHeader;