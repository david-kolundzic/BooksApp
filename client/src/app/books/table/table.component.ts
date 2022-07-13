import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/_models/book';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() books?:MatTableDataSource<Book>;
  displayedColumns:string[]=['id', 'title', 'date', 'description']
  dataSource:any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
