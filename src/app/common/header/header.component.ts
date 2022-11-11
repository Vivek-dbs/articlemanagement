import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  urlSegement:any = '';
  constructor(public router: Router) {
    this.router.events.subscribe((event:any)=>{
      this.urlSegement = window.location.href.split('/').pop();
    })
   }

  ngOnInit(): void {
  }

  logout(){
     console.log("hii");
     
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
