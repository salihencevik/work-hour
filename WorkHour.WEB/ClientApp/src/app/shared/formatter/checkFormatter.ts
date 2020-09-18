import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service';


@Component({
  selector: 'app-check-formatter-cell',
  template: `
    <span>{{getCheckName(params.value)}}</span>
  `
})

export class CheckFormatterComponent {
  params: any;
  items: any[] = [];

  constructor() {
  }

  getCheckName(id: number) {
    var check = "";
    if (id == 1) {
      check = 'Evet';
    }
    else if (id == 0) {
      check = 'Hayır';
    }
    return check;
  }

  agInit(params: any): void {
    this.params = params;
  }
}
