import { Component, OnInit } from '@angular/core';
import { faBookBookmark, faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faAddressBook = faAddressBook;
  constructor() { }

  ngOnInit(): void {
  }

}
