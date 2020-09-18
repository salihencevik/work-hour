import { Component, OnInit, ViewChild } from '@angular/core';
import { PageMode } from '../../shared/Model/PageMode';
import { GridComponent } from '../grid/grid.component';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../shared/service/snack-bar/snack-bar.service';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild(GridComponent) grid: GridComponent;
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];

  constructor(private rakamHttpService: WorkHourHttpService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Müşteri Adı', field: 'customerName' },
      { headerName: 'Telefon', field: 'phone' },
      { headerName: 'Adres', field: 'address' },
      { headerName: 'E-mail', field: 'email' },
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
    let url = "/Customer/SaveItem";
    var body = this.grid.newItem;
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
