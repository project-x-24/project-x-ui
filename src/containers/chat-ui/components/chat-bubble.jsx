export const ChatBubble = ({ message }) => {
  return (
    <div className="flex flex-col w-full">
      <div
        style={{ fontFamily: 'Poppins' }}
        className={`max-w-[70%] min-w-[150px] px-[10px] pt-[10px] pb-[3px] my-2  ${
          message.isSelf
            ? 'bg-[#EB5017] text-[white] rounded-[16px] rounded-br-[0px] flex flex-col self-end'
            : 'bg-[#F4F4F4] text-[#1E1E1E] flex flex-col rounded-[16px] rounded-bl-[0px] self-start text-left'
        }`}
      >
        <p>{message.message}</p>
        <span
          className={`text-xs mt-[3px]  ${
            message.isSelf ? 'text-white' : 'text-gray-500'
          } text-right`}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
