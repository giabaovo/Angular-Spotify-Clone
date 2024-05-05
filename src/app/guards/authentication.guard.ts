import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { SpotifyService } from '../services/Spotify.service';

export const authenticationGuard: CanMatchFn = (route, state) => {

  const spotifyService = inject(SpotifyService)
  const router = inject(Router)
  const token = localStorage.getItem('token')

  if (!token) {
    notAuthentication()
  }

  return new Promise(async (res) => {
    try {
      const userCreated = await spotifyService.initialUser()
      if (userCreated) {
        res(true)
      }
      else {
        res(notAuthentication())
      }
    } catch (error) {
      router.navigate(['/login'])
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