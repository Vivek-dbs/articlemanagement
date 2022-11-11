import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CarouselModule,
    FormsModule
  ]
})
export class UserModule { }
