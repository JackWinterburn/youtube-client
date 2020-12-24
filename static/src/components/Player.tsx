import { useRef } from "react";
import YouTube, { Options } from "react-youtube";
import { connect, sendMsg } from "../connection";
import "../scss/Player.scss";

export default function Player() {
  let YTref = useRef<any>(null);

  connect((msg) => {
    let msgBody = JSON.parse(msg.data).body;
    console.log(msgBody);
    switch (msgBody) {
      case "play":
        YTref.current.internalPlayer.playVideo();
        break;
      case "pause":
        YTref.current.internalPlayer.pauseVideo();
        break;
    }
  });

  const YTOptions: Options = {
    height: "390",
    width: "640",
    host: "http://www.youtube.com",
    playerVars: {
      controls: 1,
      rel: 0,
    },
  };

  return (
    <div className="YT-player-wrapper">
      <YouTube
        ref={YTref}
        className="YT-player"
        videoId="_2HIkR4aWxU"
        opts={YTOptions}
      />

      <i className="fas fa-play" onClick={() => sendMsg("play")}></i>
      <i className="fas fa-pause" onClick={() => sendMsg("pause")}></i>
    </div>
  );
}
