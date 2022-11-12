import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api/api-service.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
   articleData:any;
   article_id:any;
   currentUser:any;
  constructor(public api: ApiServiceService,public activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.article_id = params.get('id');
    } )
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.getArticleDetails();
  }

  getArticleDetails(){
    let data = {
      article_id: this.article_id,
      user_id: this.currentUser._id
    }
          this.api.getUserArticleDetails(data).subscribe((res:any)=>{
          console.log('res :', res);
            if(res.status == true){
              this.articleData = res.data[0];
            }else{
               alert(res.message);
               this.articleData = '';
            }
          })
  }

}
