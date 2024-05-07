import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  currentSearch = [
    'abc', 'xyzy', 'jvfisvj',
    'aif', 'opej'
  ]

  searchField = ''

  defineSearchField(data: string) {
    this.searchField = data
  }

  search() {
    console.log('abc')
  }
}
