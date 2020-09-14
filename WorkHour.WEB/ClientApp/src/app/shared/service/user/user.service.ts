import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [];
  loading = false;
  loaded = false;

  constructor(private httpClient: HttpClient) { 
  }

  getItems() {
    if (!this.loading && !this.loaded) {
      this.loadItems();
    }
    return this.users;
  }

  loadItems() {
    this.users = [];
    this.loading = true;
    var url = '/User/GetItems';
    this.httpClient.get(url).subscribe((data: any) => {
      console.log(data);
      this.users = data.item;
      this.loaded = true;
    }, () => {
      this.loading = false;
    })
  }

}
