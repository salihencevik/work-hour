import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { PersonelClaimService } from '../personel-claim/personel-claim.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MenuService } from '../menu/menu.service';
import { LoginInfo } from '../../Model/login-info';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { CustomerService } from '../customer/customer.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private personelClaimService: PersonelClaimService,
    private menuService: MenuService) { this.loadLoginInfo(); }
  private apiUrl: string = "https://localhost:44391/Authentication/";
  public loginInfo: LoginInfo;
  result: boolean = false;
  returnUrl: string;
  Login(username: string, password: string) {
    let api = this.apiUrl + "Login" + "/" + username + "/" + password;
    return this.httpClient.get(api).subscribe((x: any) => {
      if (x.loginResponseType == 1) {
        this.setLoginInfo(x);
        var url = this.returnUrl;
        this.returnUrl = null;
        if (url == null || url == undefined || url == '') {
          url = '/Dashboard';
        }
        this.personelClaimService.setClaims(x.claimText);
        this.menuService.setMenus(x.menus);
        this.router.navigateByUrl(url);

      }
    });
  }

  public getAuthContext() {
    if (this.loginInfo == null) {
      return null;
    }
    else {
      return { UserId: this.loginInfo.id, Token: this.loginInfo.token };
    }
  }

  public setLoginInfo(data) {
    if (data.loginResponseType == 1) {
      this.loginInfo = new LoginInfo();
      this.loginInfo.claims = data.claimText;
      this.loginInfo.id = data.id;
      this.loginInfo.menu = data.menuItem;
      this.loginInfo.token = data.token;
      this.loginInfo.username = data.userName;
      this.loginInfo.displayName = data.name + ' ' + data.surname;
    }
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.loginInfo), 'secret key 123');
    localStorage.setItem('auth', ciphertext);
  }

  checkLogin(): boolean {
    var subject = new Subject<boolean>();
    let str = localStorage.getItem('auth');
    if (str != null && str != "") {
      let api = this.apiUrl + "CheckLogin";
      this.httpClient.get(api).subscribe((x: any) => {
        console.log(x);
        if (x.loginResponseType == 4) {
          this.setLogout();
        }
      });
      var bytes = CryptoJS.AES.decrypt(str, 'secret key 123');
      this.loginInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.personelClaimService.setClaims(this.loginInfo.claims);
      this.menuService.setMenus(this.loginInfo.menu);
      return true
    }
    else {
      return false;
    }
  }

  //checkLogin(): Observable<boolean> {
  //  var subject = new Subject<boolean>();
  //  let str = localStorage.getItem('auth');
  //  if (str != null && str != "") {
  //    let api = this.apiUrl + "CheckLogin";
  //    this.httpClient.get(api).subscribe((x: any) => {
  //      debugger;
  //      if (x.loginResponseType != 4) {

  //        var bytes = CryptoJS.AES.decrypt(str, 'secret key 123');
  //        this.loginInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //        this.personelClaimService.setClaims(this.loginInfo.claims);
  //        this.menuService.setMenus(this.loginInfo.menu);
  //        return true
  //      }
  //      else {
  //        return false
  //      }
  //    });

  //  } else {
  //    return new Observable<false>();
  //  }
  //}

  getLoginInfo() {
    return this.loginInfo;
  }



  setLogout() {
    this.loginInfo = null;
    localStorage.removeItem('auth');
    this.router.navigate(['/session/signin']);
  }
  loadLoginInfo() {
    let str = localStorage.getItem('auth');
    if (str != null && str != "") {
      var bytes = CryptoJS.AES.decrypt(str, 'secret key 123');
      this.loginInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  }

  getCurrentUserFullName() {
    return this.loginInfo.displayName;
  }

} 
