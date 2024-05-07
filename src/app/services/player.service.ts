import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMusic } from '../interfaces/IMusic';
import { newMusic } from '../Common/factories';
import { SpotifyService } from './Spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentSong = new BehaviorSubject<IMusic>(newMusic())
  timerId: any = null

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentSong()
  }

  async getCurrentSong() {
    clearInterval(this.timerId)

    const song = await this.spotifyService.getSpotifyCurrentSong()
    this.defineCurrentSong(song)

    this.timerId = setInterval(async () => {
      await this.getCurrentSong()
    }, 3000)
  }

  defineCurrentSong(song: IMusic) {
    this.currentSong.next(song)
  }
}
