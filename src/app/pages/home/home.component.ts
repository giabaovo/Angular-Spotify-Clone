import { Component } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusic } from 'src/app/interfaces/IMusic';
import { SpotifyService } from 'src/app/services/Spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  playIcon = faPlay

  songs: IMusic[] = []

  constructor(private spotifyService: SpotifyService) {
    this.getLikedSongs()
  }

  async getLikedSongs() {
    this.songs = await this.spotifyService.getSaveTrackMusic()
    console.log(this.songs)
  }

  getArtistsFromSong(song: IMusic) {
    return song.artists.map(s => s.name).join(', ')
  }

  async playSong(song: IMusic) {
    await this.spotifyService.playNextSong(song.id)
  }
}
