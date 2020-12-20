import { useState, useRef } from "react";
import YouTube, { Options } from 'react-youtube';
import "../scss/Player.scss";
import Controls from "./Controls";
import { connect } from "../connection"


export default function Player() {

  //TODO (Jack): get rid of that disgusting "any" type
  const YTref = useRef<any>(null)
  connect((msg) => {
    let msgBody = JSON.parse(msg.data).body;

    switch (msgBody) {
      case "play":
        YTref.current.internalPlayer.playVideo()
        break;
      case "pause":
        YTref.current.internalPlayer.pauseVideo()
        break;
    };
  });

  const YTOptions: Options = {
    height: '390',
    width: '640',
    playerVars: {
      controls: 1,
    },
  };

  const [playerState, setPlayerState] = useState({ data: 0 });

  return (
    <div className="YT-player-wrapper">
      <YouTube
        ref={YTref}
        className="YT-player"
        videoId="2g811Eo7K8U"
        opts={YTOptions}
        onStateChange={(e: { target: any, data: number }): void => {
          setPlayerState(_ => ({ data: e.data }));
          console.log(e.target)
        }} />
      <Controls isPlaying={playerState.data === 1 ? true : false} />
    </div>
  );
}