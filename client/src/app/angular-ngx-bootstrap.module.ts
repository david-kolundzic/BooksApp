import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports:[
    AccordionModule,
    TabsModule,
    PaginationModule,
    PopoverModule,
    ModalModule,
   
  ]
})
export class AngularNgxBootstrapModule { }
