import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service'; 
import { BusinessStatus } from '../enum/enums';

@Component({
  selector: 'app-business-status-formatter-cell',
  template: `
    <span>{{getStatus(params.value)}}</span>
  `
})

export class BusinessStatusFormaterComponent {
  params: any;
  users: any[] = [];

  constructor() {



  }

  getStatus(id: number) {
    if (id = BusinessStatus.Active) {
      return 'Aktif'
    }
    else if (id = BusinessStatus.Completed) {
      return 'Tamamlandı'
    }
    else if (id = BusinessStatus.Waiting) {
      return 'Beklemede'
    }
    else if (id = BusinessStatus.Cancel) {
      return 'İptal'
    } 
    else if (id = BusinessStatus.PostTestCorrection) {
      return 'Test Edilecek'
    }
    else if (id = BusinessStatus.TobeTested) {
      return 'Test Sonrası Düzeltme'
    } 
    else {
      return ''
    }
  }

  agInit(params: any): void {
    this.params = params;
  }
}
