


import { Injectable } from '@angular/core'; 
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menus: any[];


  constructor() { }

  setMenus(menuList: any[]) {
    this.menus = menuList;
  }
}
