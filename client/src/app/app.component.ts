import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faCoffee} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  faCoffe = faCoffee;
  /**
   *
   */
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('https://localhost:44363/api/book/getall').subscribe({
      next:(response) => {
        console.log(response);
        
      }, error: (err) => {
          console.log("ERRROR UHVA'EN");
          
      },
    })
  }
}
