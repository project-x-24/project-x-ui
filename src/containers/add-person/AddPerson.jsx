import { AddUserIcon } from '../../assets';
import { AvatarIcon } from '../../assets';
import { SearchIcon } from '../../assets';
import grandpaDummy from '../../assets/images/grandpaDummy.png';
import grandmaDummy from '../../assets/images/grandmaDummy.png';
import { useRef, useState } from 'react';
import AudioVisualizer from '../../components/audio-visualizer/AudioVisualizer';
import { LeftArrowIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { AI_AGENT_LIST } from '../../constants/common';

const personList = [
  {
    name: 'William James',
    avatar: grandpaDummy,
    relation: 'Popup',
  },
  {
    name: 'Annie William',
    avatar: grandmaDummy,
    relation: 'Meamaw',
  },
];

const AddPerson = () => {
  //   const [isRecording, setIsRecording] = useState(false);
  //   const [audioURL, setAudioURL] = useState("");
  //   const mediaRecorderRef = useRef(null);
  //   const audioChunksRef = useRef([]);

  //   const startRecording = async () => {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorderRef.current = mediaRecorder;

  //     mediaRecorder.start();
  //     setIsRecording(true);

  //     mediaRecorder.ondataavailable = (event) => {
  //       audioChunksRef?.current?.push(event.data);
  //     };

  //     mediaRecorder.onstop = () => {
  //       const audioBlob = new Blob(audioChunksRef?.current, {
  //         type: "audio/wav",
  //       });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       setAudioURL(audioUrl);
  //       audioChunksRef.current = []; // Reset for next recording
  //     };
  //   };

  //   const stopRecording = () => {
  //     mediaRecorderRef?.current?.stop();
  //     setIsRecording(false);
  //   };

  const navigate = useNavigate();

  const handleOnPersonSelect = (id) => {
    navigate(`/chat/${id}`);
  };

  const handleOnBackButtonClick = () => {
    navigate(-1);
  };

  const filteredAgentList = AI_AGENT_LIST.filter(
    (item) => item.persona !== 'Game' && item.persona !== 'Assistant'
  );

  return (
    <div className="flex flex-col justify-start px-6 py-5 items-center w-full md:w-[410px] bg-white h-full gap-3">
      <button
        onClick={handleOnBackButtonClick}
        className="flex justify-start w-full gap-6 items-center"
      >
        <div className="text-xl flex">
          <LeftArrowIcon />
        </div>
        <p className="text-xl text-[#EB5017] font-bold">Back</p>
      </button>
      {/* <div className="flex justify-center w-full">
        <button className="border border-dashed border-[#EB5017] rounded-lg p-4 font-bold text-[#EB5017] w-full flex justify-center gap-2">
          <AddUserIcon />
          Add New
        </button>
      </div> */}
      <p className="w-full text-base pt-9 flex justify-start">
        Who would you like to chat with?
      </p>
      <div className="grid grid-cols-2 w-full gap-4 ">
        {filteredAgentList.map((item, index) => (
          <button
            key={item.persona + index}
            onClick={() => handleOnPersonSelect(item.id)}
            className="flex flex-col items-center gap-2"
          >
            <img
              src={item.imageSrc}
              className="rounded-xl w-full aspect-square object-cover mt-[26px]"
            />
            <p className="font-bold">{item.persona}</p>
            <p className="font-bold text-[#98A2B3]">{item.relation}</p>
          </button>
        ))}
        <button className="flex justify-center items-center border border-dashed border-[#EB5017] rounded-xl w-[170px] h-[170px] mt-[26px]">
          <AddUserIcon />
          Add New
        </button>
      </div>
      {/* <AudioVisualizer>
        <img
          src={grandpaDummy}
          className="rounded-full w-[150px] h-[150px] object-cover"
        />
      </AudioVisualizer> */}
    </div>
  );
};

export default AddPerson;
