import { Injectable } from '@angular/core';
import { WorkHourHttpService } from '../http/workHourHttp';
import { URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers = [];
  loading = false;
  loaded = false;

  constructor(private httpClient: WorkHourHttpService) {
  }

  getItems() {
    if (!this.loading && !this.loaded) {
      this.loadItems();
    }
    return this.customers;
  }

  loadItems() {
    this.loading = true;
    var url = '/Customer/GetItems';
    var params = new URLSearchParams();
    params.set('pageNumber', '0');
    params.set('pageSize', '0');
    this.httpClient.httpGet(url, params, null, (data) => {
      this.customers = data.item.items;
      this.loaded = true;
    }, () => {
      this.loading = false;
    })
  }
}
