import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faShirtsinbulk } from '@fortawesome/free-brands-svg-icons';
import { Author } from 'src/app/_models/author';
import { AuthorService } from 'src/app/_services/author.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})

export class AuthorEditComponent implements OnInit {
 checked=true;
  user:any;
  model:Author = new Author();
  constructor(private authorService: AuthorService, private router: Router, private toastr: ToastrService) { 
    
   }

  ngOnInit(): void {
    this.getAll();
  }

  onSubmit(form:NgForm){
    console.log("SUBMITED");
    console.log("propba")
    console.log(form)
    
    this.authorService.saveAuthor(this.model).subscribe({
      next: (response)=>{
        console.log(response);
       
        this.router.navigateByUrl('/')

        this.toastr.success("Author: "+this.model.name + " craated", "Success!")
        this.model = {};
      },
      error: error=>{
        console.log("Error create Author>");
        this.toastr.error(error.error, "Error message")
      }
    })

    
  };
  onReset(nf:NgForm){
    nf.reset();
  }

  getAll(){
    this.authorService.getAuthors().subscribe({
      next:(response)=> {
        console.log("Response");
        console.log(response)
      },
      error: error=>{
        console.log("Error get Author>");
        console.log(error);
      }
    });
  }

}
