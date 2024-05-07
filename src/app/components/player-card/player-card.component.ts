import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/Common/factories';
import { IMusic } from 'src/app/interfaces/IMusic';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  // Icons
  previousIcon = faStepBackward
  nextIcon = faStepForward

  song: IMusic = newMusic()
  subs: Subscription[] = []

  constructor(private playerService: PlayerService) {

  }

  ngOnInit(): void {
    this.getPlayingSong()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  getPlayingSong() {
    const sub = this.playerService.currentSong.subscribe(song => {
      this.song = song
    })

    this.subs.push(sub)
  }

  onClickPreviousSong() {
    this.playerService.playPreviousSong()
  }

  onClickNextSong() {
    this.playerService.playNextSong()
  }
}
