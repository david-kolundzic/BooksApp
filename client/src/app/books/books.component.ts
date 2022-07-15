import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../_models/book';
import { BookService } from '../_services/book.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Author } from '../_models/author';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class BooksComponent implements OnInit {
  // books?:Book[];
  books?: MatTableDataSource<Book>
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  /// ICONS
  faCircleInfo=faCircleInfo;
  faClockRotateLeft = faClockRotateLeft;

  checked=true;
  data:any;
  
  displayColumns=['Id', 'firstName', 'Description', 'Publish date', 'Authors'];
  displayedColumns:string[]=['id', 'link','title', 'published', 'description'];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement?:Author | null;
  dataSource:any;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    //.... })
    element.expanded = !element.expanded
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(){
    this.bookService.getBooks().subscribe(
     { next: (response)=> {
        this.data = response;
        this.books =new MatTableDataSource<Book>(response);
        console.log(this.books);
        this.books.paginator = this.paginator!;
      },error:(err) =>{
        console.log("Error load books -> ", err);
      }
    }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.books!.filter = filterValue.trim().toLowerCase();
  }

  getTitleList(titles:any){
    return titles.map((t:any) =>t.title.trim()).join("</br>");
    }
  
 

}
