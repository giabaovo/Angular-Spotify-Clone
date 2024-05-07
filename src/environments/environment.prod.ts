export const environment = {
    production: true
};

export const SpotifyConfiguration = {
    clientId: 'ff6cd80a71d341dfb368167c34e662dd',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'http://localhost:4200/login/',
    scopes: [
      "user-read-currently-playing", // music playing now
      "user-read-recently-played", // read recently played song
      "user-read-playback-state", // read user player status
      "user-top-read", // top user artists and songs
      "user-modify-playback-state", // change the user's player
      "user-library-read", // read user library
      "playlist-read-private", // read private playlists
      "playlist-read-collaborative", // read collaborative playlists
      "user-follow-read", // read user followed artists
    ]
}