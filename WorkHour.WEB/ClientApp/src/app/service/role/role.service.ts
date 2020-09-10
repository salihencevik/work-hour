import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles = [];
  loading = false;
  loaded = false;

  constructor(private httpClient: HttpClient) { 
  }

  getItems() {
    if (!this.loading && !this.loaded) {
      this.loadItems();
    }
    return this.roles;
  }

  loadItems() {
    this.roles = [];
    this.loading = true;
    var url = '/Role/GetItems'; 
    this.httpClient.get(url).subscribe((data: any) => {
      
      this.roles = data.item;
      this.loaded = true;
    }, () => {
        this.loading = false;
    })
  }
}
