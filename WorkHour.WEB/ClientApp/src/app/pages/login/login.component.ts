import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackBarService } from '../../service/snack-bar/snack-bar.service';
import { LoginService } from '../../service/login/login.service';
import { PersonelClaimService } from '../../service/personel-claim/personel-claim.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private snackBarService: SnackBarService) {}

  ngOnInit() {
  } 

  Login(e) {
    debugger;
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value; 
    if (username != null && password != null) { 
      this.loginService.Login(username, password)
    }
  }
}
