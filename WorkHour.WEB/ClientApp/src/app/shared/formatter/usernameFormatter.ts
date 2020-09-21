import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service';


@Component({
  selector: 'app-username-formatter-cell',
  template: `
    <span>{{getUserName(params.value)}}</span>
  `
})

export class UsernameFormatterComponent {
  params: any;
  users: any[] = [];

  constructor(private userService: UserService) {


    this.users = this.userService.getItems();

  }

  getUserName(id: number) { 
    var user = this.users.find(t => t.id == id);
    if (user == null) {
      return '';
    }

    return user.name + ' ' + user.surname;
  }

  agInit(params: any): void {
    this.params = params;
  }
}
