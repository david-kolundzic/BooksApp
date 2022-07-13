import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { BooksComponent } from './books/books.component';
import { DetailComponent } from './books/detail/detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'books', component: BooksComponent}, 
  {path:'books/:name/:id', component: DetailComponent}, 
  {path:'author/edit/:id', component: AuthorEditComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
