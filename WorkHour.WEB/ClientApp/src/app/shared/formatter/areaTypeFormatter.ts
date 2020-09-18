import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { AreaType } from '../enum/enums';


@Component({
  selector: 'app-areaType-formatter-cell',
  template: `
    <span>{{getAreaType(params.value)}}</span>
  `
})

export class AreaTypeFormatterComponent {
  params: any;
  users: any[] = [];

  constructor() {

     

  }

  getAreaType(id: number) {
    if (id = AreaType.Ev) {
      return 'Ev'
    }
    else if (id = AreaType.Ofis) {
      return 'Ofis'
    }
    else {
      return ''
    }
  }

  agInit(params: any): void {
    this.params = params;
  }
}
