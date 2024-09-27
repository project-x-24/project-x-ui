
const Thumbnail = ({ item }) => {
  if (item.type === 'image') {
    return (
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-full object-cover rounded-[8px]"
      />
    );
  } else if (item.type === 'video') {
    return (
      <video
        src={item.url}
        alt={item.title}
        className="w-full h-full object-cover rounded-[8px]"
      />
    );
  } else {
    return (
      <div className="flex justify-center items-center w-full h-full bg-gray-200 rounded-[8px]">
        <span className="text-lg">{item.title}</span>
      </div>
    );
  }
};

export default Thumbnail;