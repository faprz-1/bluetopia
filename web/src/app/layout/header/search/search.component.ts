import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchActive:boolean = false;
  searchValue:string = '';
  searchFocused:boolean = false;

  closeSearch() {
    this.searchActive = false; // Close the search block
    this.searchValue = ''; // Empty the search field
    this.searchFocused = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
