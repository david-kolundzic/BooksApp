import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() booksFromBookComponent: any;
  @Input() faCircleInfo: any;
  @Input() faBook: any;

  constructor() { }

  ngOnInit(): void {
  }

  getClean(name:string):string{
    return name.split(' ').join('-')
  }
}
