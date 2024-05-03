import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpotifyService } from '../services/Spotify.service';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const spotifyService = inject(SpotifyService)
  const token = localStorage.getItem('token')

  if (!token) {
    notAuthentication()
  }

  return new Promise((res) => {
    const userCreated = spotifyService.initialUser()
    if (userCreated) {
      res(true)
    }
    else {
      res(notAuthentication())
    }
  })

  return true;
};

const notAuthentication = () => {

  const router = inject(Router)

  localStorage.clear()
  router.navigate(['/login']);
  return false;
}