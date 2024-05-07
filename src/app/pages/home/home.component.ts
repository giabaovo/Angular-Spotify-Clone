import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/Common/factories';
import { IMusic } from 'src/app/interfaces/IMusic';
import { SpotifyService } from 'src/app/services/Spotify.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  playIcon = faPlay

  songs: IMusic[] = []
  currentSong: IMusic = newMusic()

  subs: Subscription[] = []

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getLikedSongs()
    this.getCurrentSong()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  getCurrentSong() {
    const sub = this.playerService.currentSong.subscribe(song => {
      this.currentSong = song
    })

    this.subs.push(sub)
  }

  async getLikedSongs() {
    this.songs = await this.spotifyService.getSaveTrackMusic()
  }

  getArtistsFromSong(song: IMusic) {
    return song.artists.map(s => s.name).join(', ')
  }

  async playSong(song: IMusic) {
    await this.spotifyService.playNextSong(song.id)
    this.playerService.defineCurrentSong(song)
  }
}
