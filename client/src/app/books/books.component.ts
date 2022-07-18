import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Book } from '../_models/book';
import { BookService } from '../_services/book.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Author } from '../_models/author';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';
import { AuthorService } from '../_services/author.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class BooksComponent implements OnInit {
  // books?:Book[];
  books?: MatTableDataSource<Book>;
  authors?: Author[];
  selectedValueAuthor?: string;
  selectedOptionAuthor: any;
  previewOptionAuthor?: any;
  errorloading=false;
  errorMessage?:string;

  newBook: Book = {} as Book;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  modalRef?: BsModalRef;
  /// ICONS
  faCircleInfo = faCircleInfo;
  faClockRotateLeft = faClockRotateLeft;

  checked = true;
  data: any;

  displayColumns = [
    'Id',
    'firstName',
    'Description',
    'Publish date',
    'Authors',
  ];
  displayedColumns: string[] = [
    'id',
    'link',
    'title',
    'published',
    'description',
  ];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement?: Author | null;
  dataSource: any;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  toggleRow(element: { expanded: boolean }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    //.... })
    element.expanded = !element.expanded;
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.data = response;
        this.books = new MatTableDataSource<Book>(response);
        console.log(this.books);
        this.books.paginator = this.paginator!;
        this.errorloading=false;
      },
      error: (err) => {
        this.errorloading=true;
        this.errorMessage=JSON.stringify( err);
        this.toastrService.error("", "Error getting data.")
        console.log('Error load books -> ', err.error.jsonStringify());
      },
    });
  }
  loadAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (response) => {
        this.authors = response;
        console.log(this.authors);
      },
      error: (err) => {
        console.log('Error load books -> ', err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.books!.filter = filterValue.trim().toLowerCase();
  }

  getTitleList(titles: any) {
    return titles.map((t: any) => t.title.trim()).join('</br>');
  }

  openModal(template: TemplateRef<any>) {
    console.log('otvori');

    this.modalRef = this.modalService.show(template);
  }
  editModalOpened=false;
  copyOfBook: Book = {} as Book;
  openEditModal(template: TemplateRef<any>, element:any) {
    console.log(element);
    element.changed=Date.now();
    this.copyOfBook = {...element}
    this.newBook = element;
    this.modalRef = this.modalService.show(template);
    this.editModalOpened=true;
  }
  confirmModal(template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.bookService.saveBook(this.newBook).subscribe({
      next: (response) => {
        this.toastrService.success(response.title, "Book is saved!")
        if(this.editModalOpened){
          let bookIndex = this.data.findIndex(( d:any )=> d.id === this.newBook.id); 
         this.data[bookIndex].booksHistory.push(this.copyOfBook)
          this.books = new MatTableDataSource<Book>(this.data);
          this.changeDetectorRefs.detectChanges();
        }else{
          this.newBook.id=response.id;
          this.newBook.bookHistory=[];

          this.data.unshift(this.newBook);
          
          this.books= new MatTableDataSource<Book>(this.data);
          this.changeDetectorRefs.detectChanges();
        }
      },
      error: (err) => {
        console.log('Error save new book -> ', err);
        this.toastrService.error(err.error, "Error save in book!")
      },
    });
  }



  cancelModal(templae: TemplateRef<any>) {
    console.log('cancel data');
    this.modalRef?.hide();
    this.newBook = {} as Book;
  }

  onSelectAuthor(event: TypeaheadMatch) {
    this.selectedOptionAuthor = event.item;
    if (!this.newBook.authors) {
      this.newBook.authors = [];
    }
    this.newBook.authors.push(this.selectedOptionAuthor);
    this.selectedOptionAuthor = {};
    this.selectedValueAuthor = '';
  }
}
