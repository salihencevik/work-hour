import { Component } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';


@Component({
  selector: 'app-customer-name-formatter-cell',
  template: `
    <span>{{getCustomerName(params.value)}}</span>
  `
})

export class CustomerNameFormatterComponent {
  params: any;
  customers: any[] = [];

  constructor(private customerService: CustomerService) {
    this.customers = this.customerService.getItems();
  }

  getCustomerName(id: number) {
    var customer = this.customers.find(t => t.id == id);
    if (customer == null) {
      return '';
    }

    return customer.customerName;
  }

  agInit(params: any): void {
    this.params = params;
  }
}
