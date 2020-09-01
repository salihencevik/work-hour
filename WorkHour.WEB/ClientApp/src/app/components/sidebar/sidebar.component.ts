import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../service/menu/menu.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html', 
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private menuService: MenuService) { }

  ngOnInit() { 
    this.menuItems = this.menuService.menus;
    console.log(this.menuItems);
  }
}
