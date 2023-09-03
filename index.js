const url = "https://api.spotify.com/v1/me/player/currently-playing"
const artistname = document.getElementById('artist');
const songTitle = document.getElementById('songName');
const coverArt = document.getElementById("album-art");
const preview = document.getElementById("previewSpound")


window.onload = main();





// Function to refresh the Spotify token
async function refreshAccessToken() {
const clientId = '0c56e4fe042e4c519643c4247d4efc73';
const clientSecret = 'e4a61c2de48542e8ab7d90b930993471';
const refreshToken = 'AQAFmIEsx4hjVEVPb48omsMO__-R0zwUkPLj8gdBDhCdtDGspJeeDIA1DCKKHPoYrn4OmM4z_LSwED6h1g9zTliGMDg2HySbnvuZ0tBHqDl1RwcOb2mAXqCZ6CrWCbedlyA'

    const credentials = btoa(clientId + ':' + clientSecret)
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + `${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });
  
    const data = await response.json();
    return data.access_token;
  }
  
  // Function to get the currently playing track
  async function getCurrentTrack(accessToken) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
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
        return data
    })
  }
  
  // Usage example
  async function main() {
    try {
      const refreshedToken = await refreshAccessToken();
      const currentTrack = await getCurrentTrack(refreshedToken);
      console.log('Currently playing track:', currentTrack);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  