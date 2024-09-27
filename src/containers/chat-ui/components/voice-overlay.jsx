import { useState } from 'react';
import audio1 from '../../../assets/images/audio1.png';
import inner from '../../../assets/images/inner.png';
import middle from '../../../assets/images/middle.png';
import outer from '../../../assets/images/outer.png';

import close from '../../../assets/images/close.png';
import AudioVisualizer from '../../../components/audio-visualizer/AudioVisualizer';

export const VoiceOverlay = ({ onClick, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="fixed top-0 h-screen w-screen bg-white z-20 flex justify-center items-center">
      <div className="flex flex-col items-center gap-[20px]">
        <AudioVisualizer isEnabled={isRecording}>
          <div className="relative">
            <img
              src={inner}
              className="w-[200px]"
              onClick={() => {
                onClick?.();
                setIsRecording(!isRecording);
              }}
            />
            {isRecording && (
              <div className="absolute top-[400px] w-full text-center text-[#EB5017] font-bold">
                Listening
              </div>
            )}
            <div className="flex justify-center w-full">
              <img
                src={close}
                className="absolute top-[450px]"
                onClick={() => {
                  onClose();
                }}
              />
            </div>
          </div>
        </AudioVisualizer>
      </div>
    </div>
  );
};
