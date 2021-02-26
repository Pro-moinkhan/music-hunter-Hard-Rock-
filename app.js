// const search_songs = () => {
//     const searchText = document.getElementById('search_field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // getting data by fetch:
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displaySong(data.data))
//         .catch(error => {
//             displayError('Something went wrong. please try again later!');
//         })
// }

// async & await:
const search_songs = async() => {
    const searchText = document.getElementById('search_field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // getting data by fetch:
    try{
        const res = await fetch(url);
        const data = await res.json();
        displaySong(data.data);
    }
    catch(error){
        displayError('Something went wrong. please try again later!');
    }
}

// forEach will give elements of array:
const displaySong = songs => {
    const songContainer = document.getElementById('song_container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "search-result col-md-8 mx-auto py-4";
        songDiv.innerHTML = `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                </div>
                <audio controls src="${song.preview}"></audio>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}
const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError('Something went wrong. Cant load lyrics!');
    }
}

const displayLyrics = lyrics => {
    const lyricsDives = document.getElementById('lyricsDiv');
    lyricsDives.innerText = lyrics;
}

const displayError = error =>{
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.innerText = error;
}