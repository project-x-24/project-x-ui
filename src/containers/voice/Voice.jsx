import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
} from '@livekit/components-react';
import { useState } from 'react';
import bg from '../../assets/images/call-bg.jpg';
import avatar from '../../assets/images/avatar.jpg';
import audio from '../../assets/images/audio.png';
import speaker from '../../assets/images/speaker.png';
import video from '../../assets/images/video.png';
import close from '../../assets/images/close.png';

export const Voice = () => {
  const [token, setToken] = useState(null);
  const [url, setUrl] = useState('wss://demo-app-llkt0pq2.livekit.cloud');

  return (
    <>
      <main
        className="w-screen h-screen"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="h-full flex flex-col items-center relative">
          <div className="text-black text-[32px] font-normal mt-[140px]">
            Grand Pa
          </div>
          <div className="text-[#656464A8] opacity-[0.6] text-[21px] font-normal mt-[1px]">
            connecting...
          </div>
          <img
            src={avatar}
            className="rounded-full w-[172px] h-[172px] object-cover mt-[26px]"
          />

          <div className="absolute bg-white w-full h-[94px] rounded-t-[9px] bottom-0">
            <div className="flex gap-[24px] w-full h-full items-center justify-center">
              <img className='cursor-pointer' src={video} />
              <img className='cursor-pointer' src={audio} />
              <img className='cursor-pointer' src={speaker} />
              <img className='cursor-pointer' src={close} />
            </div>
          </div>
        </div>

        {/* Below is the logic to initiate call */}

        {/* {token === null ? (
          <button
            onClick={() => {
              setToken(
                'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tIjoiaXd1NmJoIiwicm9vbUpvaW4iOnRydWUsImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWV9LCJpc3MiOiJBUElpdG1DNTh6UkVDejkiLCJleHAiOjE3MjczNjM2MDEsIm5iZiI6MCwic3ViIjoiaHVtYW5fdXNlciJ9.ciYAa6W0mL3WzRRPog0GAbUDmlAaWperEmcKK1iknIo'
              );
            }}
          >
            Connect
          </button>
        ) : (
          <LiveKitRoom
            token={token}
            serverUrl={url}
            connectOptions={{ autoSubscribe: true }}
          >
            <ActiveRoom />
          </LiveKitRoom>
        )} */}
      </main>
    </>
  );
};

const ActiveRoom = () => {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  return (
    <>
      <RoomAudioRenderer />
      <button
        onClick={() => {
          localParticipant?.setMicrophoneEnabled(!isMicrophoneEnabled);
        }}
      >
        Toggle Microphone
      </button>
      <div>Audio Enabled: {isMicrophoneEnabled ? 'Unmuted' : 'Muted'}</div>
    </>
  );
};
