import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private router: Router, private loginService: LoginService) { }


  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger;
    let loginInfo = this.loginService.getLoginInfo();
     if (loginInfo != null && loginInfo.id > 0) {
      var obs = this.loginService.checkLogin();
      return obs;
    }
    this.router.navigate(['session/signin']); 
    return false; 
  }
  
}
