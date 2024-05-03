import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/Spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.verifyTokenUrlCallback()
  }

  verifyTokenUrlCallback() {
    const token = this.spotifyService.obtainTokenUrlCallback()
    if(!!token) {
      this.spotifyService.defineAccessToken(token)
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.obtainUrlLogin()
  }
}
