import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/Spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private spotifyService: SpotifyService) {}

  openLoginPage() {
    window.location.href = this.spotifyService.obtainUrlLogin()
  }
}
