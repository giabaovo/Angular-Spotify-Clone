import { Component } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/Spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {

  menuName: string = 'Home'
  playlists: IPlaylist[] = []

  constructor(private spotifyService: SpotifyService) {
    this.getPlaylists()
  }

  /// Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistsIcon = faGuitar;
  playListIcon = faMusic;

  onClickMenuButton(data: string) {
    this.menuName = data
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getPlaylistUser()
  }
}
