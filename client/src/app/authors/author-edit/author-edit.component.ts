import { Component, OnInit } from '@angular/core';
import { faShirtsinbulk } from '@fortawesome/free-brands-svg-icons';
import { Author } from 'src/app/_models/author';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  author = new Author();
  firstName?:string;
  checked=true;

 
  constructor() { 
    
   }

  ngOnInit(): void {
    // this.author.active = false;
  }

  onSubmit(){
    console.log("SUBMITED");
    console.log(this.author);
    
  };
  onReset(nf:any){

  }

}
