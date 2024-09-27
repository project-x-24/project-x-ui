import { useEffect, useRef, useState } from "react";
import PulseWrapper from "./PulseWrapper";

const AudioVisualizer = ({ children }) => {
  const audioRef = useRef(null);

  console.log({ audioRef });
  return (
    <div className="App flex justify-center items-center h-screen">
      <PulseWrapper audioSource={audioRef.current}>
        <div className="bg-white text-blue-500 p-4 rounded-full text-xl">
          {children}
        </div>
      </PulseWrapper>

      {/* Audio element to play and capture sound */}
      {/* <audio ref={audioRef} controls>
        <source src="/audio/test.mp3" type="audio/mp3" />
      </audio> */}
    </div>
  );
};
//   const [scale, setScale] = useState(1);
//   const audioContextRef = useRef(null);
//   const analyserRef = useRef(null);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioFile) {
//       // Set up Web Audio API
//       const audioContext = new (window.AudioContext ||
//         window.webkitAudioContext)();
//       const analyser = audioContext.createAnalyser();
//       analyser.fftSize = 256;
//       const source = audioContext.createMediaElementSource(audioSource);
//       source.connect(analyser);
//       analyser.connect(audioContext.destination);

//       audioContextRef.current = audioContext;
//       analyserRef.current = analyser;

//       const dataArray = new Uint8Array(analyser.frequencyBinCount);

//       // Update the scale based on audio data
//       const updateScale = () => {
//         analyser.getByteFrequencyData(dataArray);
//         const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length; // Average frequency
//         const newScale = 1 + average / 256; // Normalize to a scale between 1 and ~2
//         setScale(newScale);

//         requestAnimationFrame(updateScale);
//       };

//       updateScale(); // Start updating the scale
//     }
//   }, [audioFile]);

//   return (
//     <div className="relative flex justify-center items-center">
//       {/* Outer Pulse Circles, scaled based on audio */}
//       <div
//         className="absolute rounded-full bg-blue-500 opacity-50 animate-pulse"
//         style={{
//           transform: `scale(${scale})`,
//           width: "12rem",
//           height: "12rem",
//         }}
//       ></div>
//       <div
//         className="absolute rounded-full bg-blue-500 opacity-30 animate-pulse"
//         style={{
//           transform: `scale(${scale * 1.2})`,
//           width: "16rem",
//           height: "16rem",
//         }}
//       ></div>
//       <div
//         className="absolute rounded-full bg-blue-500 opacity-20 animate-pulse"
//         style={{
//           transform: `scale(${scale * 1.4})`,
//           width: "20rem",
//           height: "20rem",
//         }}
//       ></div>

//       {/* Child content */}
//       <div className="relative z-10">{children}</div>
//       <audio ref={audioRef} controls>
//         <source src='audio/audioFile.m4a' type="audio/mp4" />
//       </audio>
//     </div>
//   );
// };
//   return (
//     <div className="relative flex justify-center items-center">
//       <div className="absolute rounded-full bg-blue-500 opacity-50 w-48 h-48 animate-pulse" />
//       <div className="absolute rounded-full bg-blue-500 opacity-30 w-64 h-64 animate-pulse delay-200" />
//       <div className="absolute rounded-full bg-blue-500 opacity-20 w-80 h-80 animate-pulse delay-400" />
//       <div className="rounded-full absolute w-[150px] h-[150px] z-50">
//         {children}
//       </div>
//     </div>
//   );
// };

export default AudioVisualizer;
