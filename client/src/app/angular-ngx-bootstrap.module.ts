import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [],
  imports: [
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot()
  ],
  exports:[
    AccordionModule,
    TabsModule,
    PaginationModule,
    PopoverModule
  ]
})
export class AngularNgxBootstrapModule { }
