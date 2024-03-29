import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { LoginService } from '../../shared/service/login/login.service';
import { SnackBarService } from '../../shared/service/snack-bar/snack-bar.service';
import { UserService } from '../../shared/service/user/user.service';
import { RoleService } from '../../shared/service/role/role.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private snackBarService: SnackBarService, private UserService: UserService, private roleService: RoleService) { }

  ngOnInit() {
  } 

  Login(e) {
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value; 
    if (username != null && password != null) { 
      this.loginService.Login(username, password) 
    }
  }
}
