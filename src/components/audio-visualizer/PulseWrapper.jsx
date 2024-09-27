import React, { useState, useEffect, useRef } from "react";

const PulseWrapper = ({ children, audioSource }) => {
  const [scale, setScale] = useState(1); // State to store the current scale based on audio
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

//   console.log({ audioSource });
  useEffect(() => {
    if (audioSource) {
      console.log("test", audioSource);
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContext.resume().then(() => {
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const source = audioContext.createMediaElementSource(audioSource);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateScale = () => {
          analyser.getByteFrequencyData(dataArray);
          const average =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          console.log("Audio Frequency Data: ", dataArray); // Debugging line

          const newScale = 1 + average / 256;
          setScale(newScale);
          requestAnimationFrame(updateScale);
        };
        updateScale();
      });
    }
  }, [audioSource]);

  return (
    <div className="relative flex justify-center items-center">
      {/* Outer Pulse Circles, scaled based on audio */}
      <div
        className="absolute rounded-full bg-blue-500 opacity-50 animate-pulse"
        style={{
          transform: `scale(${scale})`,
          width: "12rem",
          height: "12rem",
        }}
      ></div>
      <div
        className="absolute rounded-full bg-blue-500 opacity-30 animate-pulse"
        style={{
          transform: `scale(${scale * 1.2})`,
          width: "16rem",
          height: "16rem",
        }}
      ></div>
      <div
        className="absolute rounded-full bg-blue-500 opacity-20 animate-pulse"
        style={{
          transform: `scale(${scale * 1.4})`,
          width: "20rem",
          height: "20rem",
        }}
      ></div>

      {/* Child content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PulseWrapper;
