export const ChatBubble = ({ message }) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`max-w-[70%] min-w-[150px] p-2 my-2  ${
          message.isSelf
            ? 'bg-[#EB5017] text-[white] rounded-[16px] rounded-br-[0px] flex flex-col self-end'
            : 'bg-white flex flex-col rounded-[16px] rounded-bl-[0px] self-start text-left'
        }`}
      >
        <p>{message.message}</p>
        {/* <span
          className={`text-xs  ${
            message.sender === 'me' ? 'text-[white]-500' : 'text-gray-500'
          } text-right`}
        >
          {message.time}
        </span> */}
      </div>
    </div>
  );
};
