import { useState, useRef, createContext } from "react";
import YouTube, { Options } from 'react-youtube';
import Controls from "./Controls";
import { connect } from "../connection"
import "../scss/Player.scss";

export const PlayerContext = createContext({ data: 0, time: 0, duration: 0 })

export default function Player() {
  //TODO (Jack): get rid of that disgusting "any" type
  let YTref = useRef<any>(null)

  connect((msg) => {
    let msgBody = JSON.parse(msg.data).body;
    // switch (msgBody) {
    //   case "play":
    //     YTref.current.internalPlayer.playVideo()
    //     break;
    //   case "pause":
    //     YTref.current.internalPlayer.pauseVideo()
    //     break;
    // };
    if (msgBody === "play") {
      YTref.current.internalPlayer.playVideo()
    } else {
      YTref.current.internalPlayer.pauseVideo()
    }
  });

  const YTOptions: Options = {
    height: '390',
    width: '640',
    playerVars: {
      controls: 1,
      listType: "playlist",
      rel: 1,
      autoplay: 1
    },
  };


  const [playerState, setPlayerState] = useState({
    data: -1,
    time: 0,
    duration: 0
  });

  const onReady = (_: Event) => {
  //  YTref.current.internalPlayer.playVideo()
    console.log("ready")
    // YTref.current.internalPlayer.pauseVideo()
  }

  return (
    <div className="YT-player-wrapper">
      <YouTube
        ref={YTref}
        className="YT-player"
        videoId="2g811Eo7K8U"
        opts={YTOptions}
        onReady={onReady}
        onStateChange={(e: { target: any, data: number }): void => {
          let newTime = e.target.getCurrentTime
          let newDuration = e.target.getDuration
          console.log(e.data)
          setPlayerState(_ => ({ data: e.data, time: newTime, duration: newDuration }));
          console.log(playerState.data)
        }} />

      <PlayerContext.Provider value={playerState}>
        <Controls />
      </PlayerContext.Provider>
    </div>
  );
}