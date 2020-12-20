import { useContext, useRef } from "react"
import { sendMsg } from "../connection"
import { PlayerContext } from "./Player"
import "../scss/Controls.scss"

const Controls: React.FC = () => {
  const playerCtx = useContext(PlayerContext)
  const progressBarRef = useRef<any>(null)

  let playBtn;
  if (playerCtx.data === 1) {
    playBtn = <i className="fas fa-pause"
      onClick={() => {
        console.log("pause");
        sendMsg("pause")
      }}></i>
  } else {
    playBtn = <i className="fas fa-play"
      onClick={() => {
        sendMsg("play")
      }}></i>
  }

  return (
    <div className="controls-wrapper">
      <progress className="progressBar" ref={progressBarRef} max="1" value="0" onClick={e => {
        console.log(progressBarRef)
        let x = e.pageX - progressBarRef.current.offsetLeft;
        // let startPos = progressBarRef.current.position;
        let xconvert = x / 300;
        let finalx = (xconvert).toFixed(100);
        progressBarRef.current.value = finalx
      }}></progress>
      { playBtn}
    </div >
  )
}

export default Controls


