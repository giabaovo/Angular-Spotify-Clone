import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artist-item-image',
  templateUrl: './artist-item-image.component.html',
  styleUrls: ['./artist-item-image.component.scss']
})
export class ArtistItemImageComponent {

  @Input()
  imgSrc = ''

  @Output()
  click = new EventEmitter<void>()

  onClick() {
    this.click.emit()
  }
}
