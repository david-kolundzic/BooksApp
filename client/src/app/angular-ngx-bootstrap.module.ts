import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [],
  imports: [
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports:[
    AccordionModule,
    TabsModule,
    PaginationModule
  ]
})
export class AngularNgxBootstrapModule { }
