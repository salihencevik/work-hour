import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../shared/service/user/user.service';
import { CustomerService } from '../../shared/service/customer/customer.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.userService.getItems();
    this.customerService.getItems();
  }
}
