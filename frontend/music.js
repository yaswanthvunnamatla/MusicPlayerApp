let audioElement = document.getElementById("audio-element");
let playPauseBtn = document.getElementById("play-pause-btn");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let progressBar = document.getElementById("progress");
let songTitle = document.getElementById("song-title");
let artistName = document.getElementById("artist");
let albumImage = document.getElementById("album-cover");
let volume_slider = document.querySelector('.volume_slider');
let wave = document.getElementById('wave');
let isPlaying = false;
let currentSongIndex = 0;

/* let songs = [{
        title: "Adhentogani Vunnapaatuga",
        artist: "Anirudh",
        img: "./assets/AdhentoganiUnnapaatuga-Jersey.jpg",
        src: "./assets/song4.mp3",
    },
    {
        title: "Eppudo Ninnu",
        artist: "Yazin Nizar",
        img: "./assets/Eppudo-Ninnu-Sitaramam.jpg",
        src: "./assets/song2.mp3",
    },
    {
        title: "Life of Ram",
        artist: "Pradeep Kumar",
        img: "./assets/Life-of-Ram.jpg",
        src: "./assets/song3.mp3",
    },
    {
        title: "Seven (feat. latto)",
        artist: "Jungkook",
        img: "./assets/Seven-Jungkook.jpg",
        src: "./assets/song1.mp3",
    },
    {
        title: "Inthandham",
        artist: "S.P Charan",
        img: "./assets/Inthandham-Sitaramam.jpg",
        src: "./assets/song7.mp3",
    },
    {
        title: "Oh Sita Hey Rama",
        artist: "S.P Charan, Ramya Behara",
        img: "./assets/OhSitaHeyRama-Sitaramam.jpg",
        src: "./assets/song8.mp3",
    },
    {
        title: "Kannunna Kalyanam",
        artist: "Anurag Kulkarni, Sinduri S",
        img: "./assets/KaanunnaKalyanam-Sitaramam.jpg",
        src: "./assets/song6.mp3",
    },
    {
        title: "Kushi",
        artist: "Hesham Abdul Wahab",
        img: "./assets/Kushi-title.jpg",
        src: "./assets/song5.mp3",
    },
    {
        title: "Fake Love",
        artist: "BTS",
        img: "./assets/fakelove-BTS.jpg",
        src: "./assets/song9.mp3",
    },
    {
        title: "Oo Rendu Prema Meghalila",
        artist: "Sreeram Chandra & Kids",
        img: "./assets/baby_img.jpg",
        src: "./assets/song10.mp3",
    },
]; */

let songsDetailsArr = []

async function fetchSongDetails() {
    // Fetch song details from the server and add them to `songsDetailsArr` array


    const response = await fetch("http://localhost:3000/api/songs");
    
    const data = await response.json();
    songsDetailsArr = data;
    if(data != undefined) {
            
        setTimeout(()=>{
            document.getElementById("disk").style.display = "block";
            document.getElementById("container").style.display = "none";
        },780);
        playPauseBtn.addEventListener("click", togglePlayPause);
        prevBtn.addEventListener("click", prevSong);
        nextBtn.addEventListener("click", nextSong);
        audioElement.addEventListener("timeupdate", updateProgress);

        volume_slider.addEventListener("input", setVolume);

        loadSong(currentSongIndex);
        setVolume();
    }
} 

fetchSongDetails();

function togglePlayPause() {    
    if (isPlaying) {
        audioElement.pause();
        playPauseBtn.textContent = "\u25BA";
        wave.classList.remove('loader');
    } else {
        audioElement.play();
        playPauseBtn.textContent = "\u275A\u275A";
        wave.classList.add('loader');
    }
    isPlaying = !isPlaying;
}


function updateProgress() {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songsDetailsArr.length;
    loadSong(currentSongIndex);
    audioElement.play()
    playPauseBtn.textContent = "\u275A\u275A"
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songsDetailsArr.length) % songsDetailsArr.length;
    loadSong(currentSongIndex);
    audioElement.play()
    playPauseBtn.textContent = "\u275A\u275A"
}

function loadSong(index) {
    const song = songsDetailsArr[index];
    audioElement.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumImage.src = song.img;
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songsDetailsArr.length;
    loadSong(currentSongIndex);
    audioElement.play();
    playPauseBtn.textContent = "\u275A\u275A";
}
audioElement.addEventListener("ended", playNextSong);

function setVolume() {
    audioElement.volume = volume_slider.value / 100;
}



