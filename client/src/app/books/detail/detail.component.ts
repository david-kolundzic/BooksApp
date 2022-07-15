import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/_models/author';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  book?:Book;
  faBook = faBook;
  faAngleLeft = faAngleLeft;

  constructor(private bookService:BookService, private route: ActivatedRoute ) { }

  

  ngOnInit(): void {
    this.loadBook()
  }

  loadBook(){
    let id:number = this.route.snapshot.params['id'];
    this.bookService.getBook(id).subscribe(b =>{
      this.book = b;
    } );
  }

  

}
