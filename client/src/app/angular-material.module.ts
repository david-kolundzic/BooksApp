import { NgModule } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports:[
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class AngularMaterialModule { }
