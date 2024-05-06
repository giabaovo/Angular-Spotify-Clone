import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/Spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.verifyTokenUrlCallback()
  }

  verifyTokenUrlCallback() {
    const token = this.spotifyService.obtainTokenUrlCallback()
    if(!!token) {
      this.spotifyService.defineAccessToken(token)
      this.router.navigate(['/player/home'])
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.obtainUrlLogin()
  }
}
