import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import faceAssistVideo from "../../assets/videos/faceAssist.mp4";

const CameraAssist = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <ReactPlayer
        muted
        playing
        playsinline
        width="100%"
        height="100%"
        url={faceAssistVideo}
        onEnded={handleNavigateBack}
      />
    </div>
  );
};

export default CameraAssist;
