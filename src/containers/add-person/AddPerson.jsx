import { AddUserIcon } from "../../assets";
import { AvatarIcon } from "../../assets";
import { SearchIcon } from "../../assets";
import grandpaDummy from "../../assets/images/grandpaDummy.png";
import grandmaDummy from "../../assets/images/grandmaDummy.png";
import { useRef, useState } from "react";
import AudioVisualizer from "../../components/audio-visualizer/AudioVisualizer";

const personList = [
  {
    name: "William James",
    avatar: grandpaDummy,
    relation: "Popup",
  },
  {
    name: "Annie William",
    avatar: grandmaDummy,
    relation: "Meamaw",
  },
];

const AddPerson = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef?.current?.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef?.current, {
        type: "audio/wav",
      });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);
      audioChunksRef.current = []; // Reset for next recording
    };
  };

  const stopRecording = () => {
    mediaRecorderRef?.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col justify-start px-6 py-4 items-center w-full md:w-[390px] bg-white h-full gap-6">
      <div className="flex justify-between w-full">
        <p className="text-xl text-[#EB5017] font-bold">SoulSync</p>
        <div className="flex items-center justify-evenly gap-6">
          <button className="text-xl">
            <SearchIcon />
          </button>
          <button className="text-xl">
            <AvatarIcon />
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button className="border border-dashed border-[#EB5017] rounded-lg p-4 font-bold text-[#EB5017] w-full flex justify-center gap-2">
          <AddUserIcon />
          Add New
        </button>
      </div>
      <div className="flex w-full justify-start gap-4">
        {personList.map((item, index) => (
          <div
            className="flex flex-col items-center gap-2"
            key={item.name + index}
          >
            <img
              src={item.avatar}
              className="rounded-xl w-[172px] h-[172px] object-cover mt-[26px]"
            />
            <p className="font-bold">{item.name}</p>
            <p className="font-bold text-[#98A2B3]">{item.relation}</p>
          </div>
        ))}
      </div>
      <AudioVisualizer>
        <img
          src={grandpaDummy}
          className="rounded-full w-[150px] h-[150px] object-cover"
        />
      </AudioVisualizer>
    </div>
  );
};

export default AddPerson;
