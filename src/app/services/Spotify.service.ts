import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.prod';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/IUser';
import { SetSpotifyPlaylistToIPlaylist, SetSpotifyUserToIUser } from '../Common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async initialUser() {
    if (!!this.user)
      return true

    const token = localStorage.getItem('token')

    if (!token)
      return false

    try {
      this.defineAccessToken(token)
      await this.obtainSpotifyUser()
      return !!this.user
    } catch (ex) {
      return false
    }
  }

  async obtainSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe()
    this.user = SetSpotifyUserToIUser(userInfo)
  }

  obtainUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scopes=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    const urlLogin = authEndpoint + clientId + redirectUrl + scopes + responseType;
    return urlLogin
  }

  obtainTokenUrlCallback() {
    if (!window.location.hash) {
      return ''
    }

    const params = window.location.hash.substring(1).split('&')

    return params[0].split('=')[1]
  }

  defineAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token', token)
  }

  async getPlaylistUser(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit })
    return playlists.items.map(SetSpotifyPlaylistToIPlaylist)
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
