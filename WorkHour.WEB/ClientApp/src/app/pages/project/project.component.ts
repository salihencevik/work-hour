import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { PageMode } from '../../shared/Model/PageMode';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';
import { SnackBarService } from '../../shared/service/snack-bar/snack-bar.service';
import { CustomerService } from '../../shared/service/customer/customer.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild(GridComponent) grid: GridComponent;
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];

  customers = [];

  constructor(private rakamHttpService: WorkHourHttpService,
    private snackBarService: SnackBarService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    debugger;
    this.customers = this.customerService.getItems();

    //this.customers = [
    //  { id: 1, name: 'A Projesi' },
    //  { id: 2, name: 'B Projesi' },
    //  { id: 3, name: 'C Projesi' }
    //];

    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Proje Adı', field: 'name' },
      { headerName: 'Müşteri', field: 'customerId', cellRenderer: 'customerNameFormatterComponent' },
      { headerName: 'Silindi Mi?', field: 'isDeleted', cellRenderer: 'checkFormatterComponent' },
      { headerName: 'Oluşturan Kullanıcı', field: 'createUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Oluşturulma Tarihi', field: 'createDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Güncelleyen Kullanıcı', field: 'updateUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Güncellenme Tarihi', field: 'updateDate', cellRenderer: 'longDateFormatterComponent' }
    ]
  }
  run(name: string) {
    if (this[name]) {
      this[name]();
    }
  }

  backToList() {
    this.mode = PageMode.List;
  }

  save() {
    var body = this.grid.newItem;
    let url = "/Project/SaveItem";
    this.rakamHttpService.httpPost(url, body, null, (data) => {
      if (data.item != null) {
        if (this.mode == PageMode.Create) {
          this.grid.addItem(data.item);
          this.mode = PageMode.List;
        }
        else {
          this.mode = PageMode.List;
        }
      }
    }, null);
  }
}
