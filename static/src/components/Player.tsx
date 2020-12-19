import { useState, useEffect } from "react";
import YouTube, { Options } from 'react-youtube';
import "../scss/Player.scss";


function handleStateChange(playerState: { data: number }) {
  /*
   * YT Player enums:
   * buffering = -1
   * play = 1
   * pause = 2
   * start = 3
   * stop = 0
   */

  switch (playerState.data) {
    case -1:
      console.log("Player is buffering");
      break;
    case 0:
      console.log("Player has stopped");
      break;
    case 1:
      console.log("Player is playing");
      break;
    case 2:
      console.log("Player has paused");
      break;
    case 3:
      console.log("Player has started");
      break;
    default:
      console.log("Player state has changed!");
      break;
  }
}

export default function Player() {
  const YTOptions: Options = {
    height: '390',
    width: '640',
    playerVars: {
      controls: 1,
    },
  };

  const [playerState, setPlayerState] = useState({ data: 0 });
  useEffect(() => {
    handleStateChange(playerState)
  }, [playerState])

  return (
    <div className="YT-player-wrapper">
      <YouTube
        className="YT-player"
        videoId="2g811Eo7K8U"
        opts={YTOptions}
        onStateChange={(e: { target: any, data: number }): void => {
          setPlayerState(_ => ({ data: e.data }));
        }} />
    </div>
  );
}