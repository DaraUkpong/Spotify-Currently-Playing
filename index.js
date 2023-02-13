const url = "https://api.spotify.com/v1/me/player/currently-playing"
const artistname = document.getElementById('artist');
const songTitle = document.getElementById('songName');
const coverArt = document.getElementById("album-art");
const preview = document.getElementById("previewSpound")


window.onload = getNowPlaying;

function getNowPlaying() {
    fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer BQAZHH7E2PNwSgUy2teB2PLQ0WM5bJ8wV4nxyA72-ui3QQKb5LTCSxRZlkIpjoRimgx8_masB3eQ-SjbzWPSUvICKPkwO3CBH2HnzTC5q1DAx6KmXed9npxyiPcYf0ZkoNcWJAncDN8HURzFPUIlf70-QsOudsaeeD_PMZFWUE0SH6KY1zL7mjUJpBLcrdlGnfEoB51GIQ'
            }
        })
        .then((res) => res.json())
        .then((data) => data)
        .then((data) => {
            artistname.textContent = (data.item.artists[0].name);
            songTitle.textContent = (data.item.name);
            coverArt.src = (data.item.album.images[1].url)
            console.log(data.item.artists[0].name)
            console.log(data.item.preview_url)
            preview.src = (data.item.preview_url)
        })
}