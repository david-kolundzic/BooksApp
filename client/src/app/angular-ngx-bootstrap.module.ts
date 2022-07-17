import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


@NgModule({
  declarations: [],
  imports: [
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports:[
    AccordionModule,
    TabsModule,
    PaginationModule,
    PopoverModule,
    ModalModule,
    BsDatepickerModule,
    TypeaheadModule,
   
  ]
})
export class AngularNgxBootstrapModule { }
