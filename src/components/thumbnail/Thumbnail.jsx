import { PlayIcon } from "../../assets";

const Thumbnail = ({ item }) => {
  if (item.type === 'image') {
    return (
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-full object-cover "
      />
    );
  } else if (item.type === 'video') {
    return (
      <div className="w-full h-full  flex justify-center items-center overflow-hidden relative">
      <video
        src={item.url}
        alt={item.title}
        className="w-full h-full object-cover "
      >
      </video>
              <PlayIcon className="absolute"/>
              </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center w-full h-full bg-gray-200 ">
        <span className="text-lg">{item.title}</span>
      </div>
    );
  }
};

export default Thumbnail;