import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiServiceService } from 'src/app/services/api/api-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allArticleData:any = [];
  popularArticleData:any = [];
  resultedArticleData:any = [];
  articleSearch:any = '';


  constructor(public api: ApiServiceService, public router: Router) { }

  ngOnInit(): void {
    this.getArticleData(this.articleSearch);
  }


  getArticleData(search:any=''){
    this.allArticleData = [];
    this.popularArticleData = [];
    this.resultedArticleData = [];
    this.api.getUserArticleData(search).subscribe((res:any)=>{
      if(res.status == true){
        this.allArticleData = res.data
        if(this.allArticleData.length > 5){
          this.allArticleData.forEach((element:any,key:number) => {
            if(key < 5) this.popularArticleData.push(element)
            else
            this.resultedArticleData.push(element);
        });
        }
        else{
          this.allArticleData.forEach((element:any,key:number) => {
            this.popularArticleData.push(element)
            this.resultedArticleData.push(element);
        });
        }
       
      }
      else{
        this.allArticleData = [];
        alert(res.message);
      }
    })
  }

  gotoArticleDetails(data:any){
    this.router.navigate(['user/article-details',data._id]);
  }
}
