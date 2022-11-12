import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ArticleDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CarouselModule,
    FormsModule
  ]
})
export class UserModule { }
