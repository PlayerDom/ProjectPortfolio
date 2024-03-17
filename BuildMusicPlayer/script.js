const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "All of Me",
    artist: "John Legend",
    duration: "5:07",
    src: "John Legend - All of Me (Official Video).mp3",
    srcImage: "WhatsApp Image 2024-03-17 at 12.26.02 (3).jpeg"
  },
  {
    id: 1,
    title: "Here Without You",
    artist: "3 Doors Down",
    duration: "3:55",
    src: "3 Doors Down - Here Without You (Official Music Video).mp3",
    srcImage: "WhatsApp Image 2024-03-17 at 12.20.12.jpeg"
  },
  {
    id: 2,
    title: "Ci Sono Anchio",
    artist: "883",
    duration: "3:38",
    src: "Ci Sono Anchio 883- Il Pianeta Del Tesoro.mp3",
    srcImage: "Snapinsta.app_241314803_145234807728300_2823894363851608611_n_1080.jpg"
  },
  {
    id: 3,
    title: "My Sacrifice",
    artist: "Creed",
    duration: "4:39",
    src: "Creed - My Sacrifice (Official Video).mp3",
    srcImage: "Snapinsta.app_329821270_8966511360055546_8576343018194726952_n_1080.jpg"
  },
  {
    id: 4,
    title: "Domani",
    artist: "Artisti Uniti per l'Abbruzzo",
    duration: "6:57",
    src: "Domani 21-04-09 Artisti Uniti per lAbruzzo.mp3",
    srcImage: "Snapinsta.app_375621180_563469249201590_1238888502678980250_n_1080.jpg"
  },
  {
    id: 5,
    title: "Birds",
    artist: "Imagine Dragons",
    duration: "3:42",
    src: "Imagine Dragons - Birds (Animated Video).mp3",
    srcImage: "WhatsApp Image 2024-03-17 at 12.21.11.jpeg"
  },
  {
    id: 6,
    title: "Running Up That Hill",
    artist: "Kate Bush",
    duration: "5:02",
    src: "Kate Bush - Running Up That Hill (Stranger Things Version).mp3",
    srcImage: "Snapinsta.app_313956773_426032013015371_1228499102774307848_n_1080.jpg"
  },
  {
    id: 7,
    title: "Regina di Cuori",
    artist: "Litfiba",
    duration: "4:01",
    src: "Litfiba - Regina Di Cuori (1997).mp3",
    srcImage: "Snapinsta.app_243034131_697308217911629_8873095352185874484_n_1080.jpg"
  },
  {
    id: 8,
    title: "Amandoti",
    artist: "Maneskin",
    duration: "4:25",
    src: "Måneskin - Amandoti  - Official Italiano Testo Italian Lyrics.mp3",
    srcImage: "Snapinsta.app_244485945_932603154279091_8767046095982548496_n_1080.jpg"
  },
  {
    id: 9,
    title: "L'infinito",
    artist: "Raf",
    duration: "4:00",
    src: "Raf - Linfinito (+ testo).mp3",
    srcImage: "Snapinsta.app_184336058_273825214441067_409584222469434989_n_1080.jpg"
  },
  {
    id: 10,
    title: "The Zephyr Song",
    artist: "Red Hot Chili Peppers",
    duration: "3:51",
    src: "Red Hot Chili Peppers - The Zephyr Song [Official Music Video].mp3",
    srcImage: "WhatsApp Image 2024-03-17 at 12.15.04.jpeg"
  },
  {
    id: 11,
    title: "Wherever you Will Go",
    artist: "The Calling",
    duration: "3:26",
    src: "The Calling - Wherever You Will Go (First Video- in Tijuana).mp3",
    srcImage: "WhatsApp Image 2024-03-17 at 12.23.44.jpeg"
  },
  {
    id: 12,
    title: "Wish you Were Here",
    artist: "Pink Floyd",
    duration: "4:53",
    src: "Pink Floyd - Wish You Were Here.mp3",
    srcImage: "Snapinsta.app_279108096_814637479513840_708040257972149885_n_1080.jpg"
  },
  {
    id: 13,
    title: "I'm just Ken",
    artist: "Ryan Gosling",
    duration: "3:42",
    src: "Ryan Gosling - I'm Just Ken (From Barbie The Album) [Official Audio].mp3",
    srcImage: "WhatsApp Image 2024-03-17 at 13.12.03 (1).jpeg"
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  
  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () =>{
   if (userData?.currentSong === null) return;
   else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
   }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs); 
  highlightCurrentSong(); 
  setPlayButtonAccessibleText(); 

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs()); 
      setPlayButtonAccessibleText();
      resetButton.remove();
    });

  }

};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const image = document.getElementById("Image-Display");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;


  image.src = userData?.currentSong.srcImage;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click",  pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
      playNextSong();
    } else {
      userData.currentSong = null;
      userData.songCurrentTime = 0;  
pauseSong()
setPlayerDisplay() 
highlightCurrentSong()
setPlayButtonAccessibleText() 

    }
});

const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs());
setPlayButtonAccessibleText();