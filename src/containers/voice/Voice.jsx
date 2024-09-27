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

const serverUrl = 'wss://demo-app-llkt0pq2.livekit.cloud';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjc3NzAyMjgsImlzcyI6IkFQSWl0bUM1OHpSRUN6OSIsIm5hbWUiOiJkb3lsZSIsIm5iZiI6MTcyNzQyNDYyOCwic3ViIjoiZG95bGUiLCJ2aWRlbyI6eyJyb29tIjoiZG95bGVzcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.4e18z_wstFVjD69ZGf9sPv-43jmxfeR9AU5B5nH0hr0';

export const Voice = () => {
  const [token, setToken] = useState(null);
  const [url, setUrl] = useState(serverUrl);

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
            {token ? 'Connected' : 'Connecting...'}
          </div>
          <img
            src={avatar}
            className="rounded-full w-[172px] h-[172px] object-cover mt-[26px]"
          />
          <LiveKitRoom
            token={token}
            serverUrl={url}
            connectOptions={{ autoSubscribe: true }}
            className="w-full"
          >
            <ActiveRoom setToken={setToken} />
          </LiveKitRoom>
        </div>

        {/* Below is the logic to initiate call */}

        {/* {token === null ? (
          <button
            onClick={() => {
              setToken(TOKEN);
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

const ActiveRoom = ({ setToken }) => {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();

  return (
    <>
      <RoomAudioRenderer />
      <div className="absolute bg-white w-full h-[94px] rounded-t-[9px] bottom-0">
        <div className="flex gap-[24px] w-full h-full items-center justify-center">
          {/* <img className="cursor-pointer" src={video} /> */}
          <img
            className="cursor-pointer"
            src={isMicrophoneEnabled ? audio : speaker}
            onClick={() => {
              localParticipant?.setMicrophoneEnabled(!isMicrophoneEnabled);
            }}
          />
          {/* <img className="cursor-pointer" src={speaker} /> */}
          <img
            className="cursor-pointer"
            src={close}
            onClick={() => {
              setToken(null);
            }}
          />
        </div>
      </div>
      {/* <button
        onClick={() => {
          localParticipant?.setMicrophoneEnabled(!isMicrophoneEnabled);
        }}
      >
        Toggle Microphone
      </button>
      <div>Audio Enabled: {isMicrophoneEnabled ? 'Unmuted' : 'Muted'}</div> */}
    </>
  );
};
