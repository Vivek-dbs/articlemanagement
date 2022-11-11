import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  closeResult:any;
  constructor(public modalService: NgbModal, public api: ApiServiceService) { }
 allArticleData:any = [];
 currentArticleData:any;
 article_name:any= '';
 author_name:any = '';
 description:any = '';
 article_name_edit:any= '';
 author_name_edit:any = '';
 description_edit:any = '';
 selected_file:any = '';


  ngOnInit(): void {
    this.getArticlesData();
  }

  getArticlesData(){
    this.api.getArticle().subscribe((res:any)=>{
      if(res.status == true){
        this.allArticleData  = res.data;
      }else{
        alert(res.message);
      }
    })
  }

  addArticleModalpopup(content:any){
    // this.modal.open(content, { backdropClass: 'light-blue-backdrop' });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  editArticle(article:any,content:any){
    this.currentArticleData = article;      
    this.article_name_edit = this.currentArticleData.name;
    this.author_name_edit = this.currentArticleData.author;
    this.description_edit = this.currentArticleData.description;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  updateArticle(){
    if(this.article_name_edit == null || this.article_name_edit == undefined || this.article_name_edit =='') {
      alert("Please Write Article Name..!!!");
      return;
    }
    else if(this.author_name_edit == null || this.author_name_edit == undefined || this.author_name_edit ==''){
      alert("Please write Author Name..!!!");
      return;
    }else if(this.description_edit == null || this.description_edit == undefined || this.description_edit ==''){
      alert("Please write Description..!!!");
      return;
    } else {
      let article = {
        name: this.article_name_edit,
        author: this.author_name_edit,
        description: this.description_edit,
        _id: this.currentArticleData._id
      }
      this.api.updateArticle(article).subscribe((res:any)=>{
             if (res.status == true) {
                 alert(res.message);
                 this.getArticlesData();
             } else {
              alert(res.message);
             }
      this.modalService.dismissAll();

      }) 
    }
  }

  submitArticle(){
    const article: FormData = new FormData();
    if(this.article_name == null || this.article_name == undefined || this.article_name =='') {
      alert("Please Write Article Name..!!!");
      return;
    }
    else if(this.author_name == null || this.author_name == undefined || this.author_name ==''){
      alert("Please write Author Name..!!!");
      return;
    }else if(this.description == null || this.description == undefined || this.description ==''){
      alert("Please write Description..!!!");
      return;
    } else {
      article.append('name',this.article_name);
      article.append('author',this.author_name);
      article.append('description',this.description);
      article.append('file', this.selected_file);
      this.api.submitArticle(article).subscribe((res:any)=>{
             if (res.status == true) {
                 alert(res.message);
                 this.article_name = '';
                 this.author_name = '';
                 this.description = '';
                 this.selected_file = '';
                 this.getArticlesData();
             } else {
              alert(res.message);
             }
      this.modalService.dismissAll();
      }) 
    }
  }

  selectFile(event:any){
     this.selected_file = event.target.files[0];
  }

}
