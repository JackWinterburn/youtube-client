import "../scss/Controls.scss"
import { sendMsg } from "../connection"

type PlayerProps = {
  isPlaying: boolean
}

const Controls: React.FC<PlayerProps> = ({ isPlaying }) => {

  let playBtn;
  if (isPlaying) {
    playBtn = <i className="fas fa-pause"
      onClick={() => {
        console.log("pause");
        sendMsg("pause")
      }}
    ></i>
  } else {
    playBtn = <i className="fas fa-play"
      onClick={() => {
        sendMsg("play")
      }}
    ></i>
  }

  return (
    <div className="controls-wrapper">
      {playBtn}
    </div>
  )
}

export default Controls


