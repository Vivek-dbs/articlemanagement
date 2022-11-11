import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
    // url = "http://192.168.1.106/";
    url = "http://3.110.190.211/api/";
  constructor(public http: HttpClient) { }
 
  login(data:any){
       let pageAction = 'user/login';
       return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  getArticle(){
       let pageAction = 'admin/article';
       return this.http.get(this.url+pageAction).pipe(map(results=>results));
  }

  submitArticle(data:any){
    let pageAction = 'admin/article';
    return this.http.post(this.url+pageAction, data).pipe(map(results=>results));
  }

  updateArticle(data:any){
    let pageAction = 'admin/article/edit';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }
  
  usersignUp(data:any){
    let pageAction = 'user';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  userLogin(data:any){
    let pageAction = 'user/login';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  getUserArticleData(search:any=''){
    let pageAction = 'user/dashboard?search='+search;
    return this.http.get(this.url+pageAction).pipe(map(results=>results));
  }

  getUserArticleDetails(data:any){
    let pageAction = 'user/article/view';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

}
