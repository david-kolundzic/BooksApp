import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author,  } from '../_models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  ///Get all books from api
  getAuthors() {
    return this.httpClient.get<any>(`${this.baseUrl}author/getall`);
  }
  getAuthor(id:number){
    return this.httpClient.get<any>(`${this.baseUrl}author/${id}`);
  }

  saveAuthor(author: Author):Observable<any>{
    
    return this.httpClient.put<Author>(this.baseUrl +""+"author/create", author);
  }
  

}
