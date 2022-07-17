import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { FooterComponent } from './footer/footer.component';
import { DetailComponent } from './books/detail/detail.component';
import { CardComponent } from './books/card/card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// frameworks
import {AngularMaterialModule} from './angular-material.module';
import { AngularNgxBootstrapModule } from "./angular-ngx-bootstrap.module";
import { TableComponent } from './books/table/table.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { ToastrModule} from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// import { } from 'ngx-bootstrap/accordion';
// FontAwesome Icons

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    BooksComponent,
    FooterComponent,
    DetailComponent,
    CardComponent,
    TableComponent,
    AuthorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,    
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularNgxBootstrapModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
