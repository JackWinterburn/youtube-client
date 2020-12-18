  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


  function getVideoID() {
    videoIDDiv = document.getElementById("videoIDDiv")
    let videoID = videoIDDiv.innerText
    return videoID
  }
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    videoID = getVideoID()
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: videoID,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    console.log(YT.Player)
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(e) {
    console.log("Player is ready")
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  var done = false;
  function onPlayerStateChange(e) {
    if (e.data == YT.PlayerState.PLAYING) {
      console.log("player is playing")
    }
    if (e.data == YT.PlayerState.PAUSED) {
      console.log("Paused");
    }
  }

  const muteBtn = document.getElementById("mute")
  const playBtn = document.getElementById("play")
  muteBtn.addEventListener("click", ()=> { player.mute() })
  
  playBtn.addEventListener("click", ()=> {
    if (playBtn.className == "fas fa-play") {
      player.playVideo()
      playBtn.className =  "fas fa-pause"
    } else {
      player.pauseVideo()
      playBtn.className =  "fas fa-play"
    }
  })