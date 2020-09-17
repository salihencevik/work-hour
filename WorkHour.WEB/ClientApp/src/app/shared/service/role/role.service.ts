import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { WorkHourHttpService } from '../http/workHourHttp';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles = [];
  loading = false;
  loaded = false;

  constructor(private httpClient: WorkHourHttpService) { 
  }

  getItems() {
    if (!this.loading && !this.loaded) {
      this.loadItems();
    }
    return this.roles;
  }

  loadItems() { 
    this.loading = true;
    var url = '/Role/GetItems';
    var params = new URLSearchParams();
    params.set('pageNumber', '0');
    params.set('pageSize', '0');
    this.httpClient.httpGet(url, params, null, (data) => {
      console.log(data);
      this.roles = data.item.items;
      this.loaded = true;
    }, () => {
      this.loading = false;
    })
  }
}
