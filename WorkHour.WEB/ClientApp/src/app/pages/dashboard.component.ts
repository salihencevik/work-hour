import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/service/customer/customer.service';
import { UserService } from '../shared/service/user/user.service';
import { RoleService } from '../shared/service/role/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService,
    private customerService: CustomerService,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.userService.getItems();
    this.customerService.getItems();
    this.roleService.getItems(); 
  }

}
