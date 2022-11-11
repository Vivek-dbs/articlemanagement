import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    auth:string = '/auth';
  constructor( public authService: AuthServiceService, public router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     const currentUser =  this.authService.loggedUser();
        if(currentUser) return true;
        
          this.router.navigate([this.auth])
          return false;
  }
  
}
