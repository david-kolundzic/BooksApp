import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faShirtsinbulk } from '@fortawesome/free-brands-svg-icons';
import { Author } from 'src/app/_models/author';
import { AuthorService } from 'src/app/_services/author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
 checked=true;

 
  constructor(private authorService: AuthorService) { 
    
   }

  ngOnInit(): void {
    // this.author.active = false;
  }

  onSubmit(form:any){
    console.log("SUBMITED");
    console.log("propba")
    console.log(form)
    
    this.authorService.saveAuthor(form).subscribe({
      next: (response)=>{
        console.log(response);
      },
      error: error=>{
        console.log("Error create Author>");
        console.log(error);
      }
    })

    
  };
  onReset(nf:NgForm){
    nf.reset();
  }

}
