import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/service/login/login.service';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';
import { URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private loginService: LoginService, private workHourService: WorkHourHttpService, private http: HttpClient) { }

  profilModel = {
    id: 0,
    name: null,
    surname: null,
    email: null,
    username: null,
    oldPassword: null,
    newPassword: null,
    reNewPassword: null
  };

  ngOnInit(): void {
    this.edit();
  }

  save() {
    debugger;
    var body = this.profilModel;
    var url = "/User/UpdateCurrentUser";
    this.workHourService.httpPost(url, body, null, (data) => {

    }, null);
  }

  edit() {
    var currenUserId = this.loginService.loginInfo.id;
    this.itemEdit(currenUserId);
  }

  itemEdit(id: number) {
    var params = new URLSearchParams();
    params.append('id', id.toString());

    var url = '/User/GetUserProfile' + "/" + id;

    this.workHourService.httpGet(url, params, null, (data) => {
      this.profilModel = data.item;
    }, null);
  }
}
