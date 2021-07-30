const playPauseButton = document.querySelector("#playPause");
const video = document.querySelector("#video");
const rangeSlider = document.querySelector("#sliderValue")
const timeContainer = document.querySelector(".time")
const replayButton = document.querySelector(".replay-slide")
const nextButton = document.querySelector(".next-slide");
const previousButton = document.querySelector(".prev-slide");
const buttonIcon = playPauseButton.querySelector("span")
const quiz = document.getElementById("quiz")
const controlsContainer = document.querySelector(".controls")
var videoNumber = 0;


function showPlayIcon() {
    buttonIcon.textContent = "play_arrow"
}

function togglePlay() {
    if (video.paused) {
        video.play()
        buttonIcon.textContent = "pause"
    } else {
        video.pause()
        showPlayIcon()
    }
}

function setTime(e) {
    const newTime = parseInt(e.target.value)
    time = (newTime / 100) * video.duration;
    timeContainer.textContent = parseTime(time);
    video.currentTime = time;
}

function parseTime(time) {
    const minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    
    return `${minutes}:${seconds}`
}

function updateTime() {
    rangeSlider.value = video.currentTime / video.duration * 100;
    timeContainer.textContent = parseTime(video.currentTime);
}

function replayVideo() {
    video.currentTime = 0;
}

function loadVideo(start, end) {
    video.src = `https://res.cloudinary.com/talhaquddoos/video/upload/eo_${end},so_${start}/v1627576807/2669246683_hwtrug.mp4`
    video.load();
    video.play();
    buttonIcon.textContent = "pause"
}

function nextVideo() {
    
    if(videoNumber == timeStamps.length - 3){
        nextButton.onclick = () => {}
        nextButton.classList.add("disabled")
    }

    
    if(videoNumber == timeStamps.length - 2) {
        // video.classList.add("hidden")
        // controlsContainer.classList.add("hidden")
        // quiz.classList.remove("hidden")

        return;
    }

    videoNumber++;
    console.log(videoNumber)
    previousButton.addEventListener("click", previousVideo);
    previousButton.classList.remove("disabled");
    loadVideo(timeStamps[videoNumber], timeStamps[videoNumber+1])
}


function previousVideo() {
    
    if(videoNumber == 1) {
        previousButton.onclick = () => {}
        previousButton.classList.add("disabled")
    }
    
    if(videoNumber == 0) {
        return;
    }

    videoNumber--;
    console.log(videoNumber)
    nextButton.addEventListener("click", nextVideo);
    nextButton.classList.remove("disabled");
    
    loadVideo(timeStamps[videoNumber], timeStamps[videoNumber+1])
}

setInterval(updateTime, 500)



video.addEventListener("ended", showPlayIcon)


playPauseButton.addEventListener('click', togglePlay);
rangeSlider.addEventListener('click', setTime);
replayButton.addEventListener('click', replayVideo);
video.addEventListener('click', togglePlay)

nextButton.addEventListener("click", nextVideo)