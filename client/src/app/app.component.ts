import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Book } from './_models/book';
import { BookService } from './_services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  books!: Book[];
 
  
  /**
   *
   */
  constructor() {
   
  }
  ngOnInit(): void {}
}
