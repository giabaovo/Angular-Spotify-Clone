import { Component, OnInit } from '@angular/core';
import { newArtist } from 'src/app/Common/factories';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/services/Spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit {

  topArtist: IArtist = newArtist()
  defaultArtist: IArtist = newArtist()

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getTopArtist()
    this.getDefaultArtist()
  }

  async getTopArtist() {
    const artists = await this.spotifyService.getTopArtists(1)
    if (!!artists) {
      this.topArtist = artists.pop()
    }
  }

  async getDefaultArtist() {
    const artist = await this.spotifyService.getArtist('2aQnC3DbZB9GbauvhAw7ve?si=8OVpYXymTSerKrgOFQQsug')
    if (!!artist) {
      this.defaultArtist = artist
    }
  }
}
