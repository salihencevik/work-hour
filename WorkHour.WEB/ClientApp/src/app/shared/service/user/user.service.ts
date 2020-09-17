import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { WorkHourHttpService } from '../http/workHourHttp';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [];
  loading = false;
  loaded = false;

  constructor(private httpClient: WorkHourHttpService) { 
  }

  getItems() {
    if (!this.loading && !this.loaded) {
      this.loadItems();
    }
    return this.users;
  }

  loadItems() {
    this.loading = true;
    var url = '/User/GetItems';
    var params = new URLSearchParams();
    params.set('pageNumber', '0');
    params.set('pageSize', '0');
    this.httpClient.httpGet(url, params, null, (data) => { 
      this.users = data.item.items;
      this.loaded = true;
    }, () => {
      this.loading = false;
    })
  }

}
