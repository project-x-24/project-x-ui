import { RoundedErrorIcon, RoundedTickIcon } from "../icons";

const typeStyles = {
  error: {
    background: `max-w-lg min-w-[300px] items-center rounded-md shadow-2xl`,
    color: "bg-red-600",
  },
  success: {
    background: `max-w-lg min-w-[300px] items-center rounded-md shadow-2xl`,
    color: "bg-green-600",
  },
};

const Toast = ({ type, title, description }) => (
  <div className={typeStyles[type].background} role="alert">
    <div className="flex flex-row h-full">
      <div className={`h-full w-2 ${typeStyles[type].color} rounded-l-md`} />
      <div className="flex items-center pl-4">
        {type === "success" ? (
          <RoundedTickIcon className="w-6 h-6" />
        ) : (
          <RoundedErrorIcon className="w-6 h-6" />
        )}
      </div>
      <div className="flex flex-col items-start w-full p-4">
        <div className="text-base text-gray-800 font-semibold">{title}</div>
        <div className="text-[15px] font-normal test-gray-800">
          {description}
        </div>
      </div>
    </div>
  </div>
);

export default Toast;
