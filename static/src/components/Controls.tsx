import { useContext } from "react"
import { sendMsg } from "../connection"
import { PlayerContext } from "./Player"
import "../scss/Controls.scss"

export default function Controls(): JSX.Element {
  const playerCtx = useContext(PlayerContext)

  let playBtn;
  if (playerCtx.data === 1) {
    playBtn = <i className="fas fa-pause"
      onClick={(): void => {
        console.log("pause")
        sendMsg("pause")
      } }></i>
  } else {
    playBtn = <i className="fas fa-play"
      onClick={() => {
        console.log("play")
        sendMsg("play")
      } }></i>
  }

  return (
    <div className="controls-wrapper">
      {playBtn}
    </div>
  )
}




