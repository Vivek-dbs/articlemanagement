import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
User = {
    email: '',
    token: ''
}
  constructor() { }

  loggedUser(){
    this.User = JSON.parse(localStorage.getItem('currentUser')!);
    return this.User;
  }
}
