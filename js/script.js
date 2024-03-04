const songDetails = document.querySelector(".song-details");
const songDetailsContainer = document.getElementById("song-details-container");
const songInfo = document.querySelector(".song-info");
const songCover = document.querySelector(".song-cover");
const songImg = document.querySelector(".song-img");
const playerContainer = document.querySelector("player-container");
const myAudio = document.getElementById("myAudio");
const timeCounter = document.getElementById("current-time")
const endTime = document.getElementById("end-time");
const meterBar = document.getElementById("meter-bar");
const buttonPrev = document.querySelector(".fa-step-backward");
const buttonPlayPause = document.querySelector(".button-pp");
const buttonNext = document.querySelector(".fa-step-forward");

var songIndex = 0;

function play(songIndex) {
    myAudio.setAttribute("src", songs[songIndex].src);
    songInfo.innerHTML = songs[songIndex].songName + "_"+ songs[songIndex].artistName+"_"+songs[songIndex].albumName+"_"+songs[songIndex].bitRate;
    var playIcon = document.querySelector(".button-pp");
    if(myAudio.paused) {
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
    } else {
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
    }
    
    songImg.style.background = "url('" + songs[songIndex].art + "') center/cover no-repeat fixed";
    songImg.style.animation = "animate 10s linear infinite";
}

function pause() {
    myAudio.pause();
    var playIcon = document.querySelector(".button-pp");
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    songImg.style.animation = "";
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex++;
        play(songIndex);
    } else {
        play(songIndex);
    }
}

function nextSong(){
    songIndex++

    if(songIndex < songs.length) {
        play(songIndex);
    } else {
        songIndex--;
    }
}

buttonPlayPause.addEventListener("click", ()=>{
    if(myAudio.paused && myAudio.currentTime == 0){
        play(songIndex);
    } else if(!myAudio.paused){
        pause();
    } else {
        myAudio.play();
        var playIcon = document.querySelector(".button-pp");
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
        songImg.style.animation = "animate 10s linear infinite";
    }
});
  
buttonPrev.addEventListener("click", ()=>{
    prevSong(songIndex);
});

buttonNext.addEventListener("click", ()=>{
    nextSong(songIndex);
});

myAudio.addEventListener("loadedmetadata", ()=>{
    var duration = myAudio.duration;
    
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);

    minutes = (minutes < 10) ? '0'+ minutes : minutes;
    seconds = (seconds < 10) ? '0'+ seconds : seconds;
    endTime.innerHTML = minutes + ":" + seconds;
    
    var interval = setInterval(timeFunction, 1000)

    function timeFunction() {
        //console.log(myAudio.currentTime);
        var minutes = Math.floor(myAudio.currentTime / 60);
        var seconds = Math.floor(myAudio.currentTime % 60);

        minutes = (minutes < 10) ? '0'+minutes : minutes;
        seconds = (seconds < 10) ? '0'+seconds : seconds;
        timeCounter.innerHTML = minutes+':'+seconds;

        var width = (myAudio.currentTime / myAudio.duration) * 100;
        
        if(myAudio.currentTime == myAudio.duration) {
            clearInterval(interval);
            timeCounter.innerHTML = '00:00';
            nextSong(songIndex);
        } else {
            seekBar.value = width;
        }
    }
});   

const seekBar = document.getElementById("seek-bar");

seekBar.addEventListener("input", ()=>{
    const seekPosition = seekBar.value * myAudio.duration / 100;
    myAudio.currentTime = seekPosition;
})
