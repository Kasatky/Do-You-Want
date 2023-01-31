import React from 'react';

function AudioMeditationPage() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        src="video/test.mp4"
        style={{ position: 'relative' }}
      ></video>
      <audio
        style={{ position: 'absolute' }}
        autoPlay
        controls
        src="audio/soundOfSea.mp3"
        preload="auto"
      ></audio>
    </>
  );
}

export default AudioMeditationPage;
