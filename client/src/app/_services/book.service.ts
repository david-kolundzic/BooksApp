import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  ///Get all books from api
  getBooks() {
    return this.httpClient.get<Book[]>(`${this.baseUrl}book/getall`);
  }
  getBook(id:number){
    return this.httpClient.get<Book>(`${this.baseUrl}book/${id}`);
  }
}
