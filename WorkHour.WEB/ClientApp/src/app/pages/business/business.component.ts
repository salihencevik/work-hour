import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../shared/service/snack-bar/snack-bar.service';
import { RoleService } from '../../shared/service/role/role.service';
import { PageMode } from '../../shared/Model/PageMode';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  @ViewChild(GridComponent) grid: GridComponent;
  constructor(private rakamHttpService: WorkHourHttpService, private snackBarService: SnackBarService, private roleService: RoleService) { }
  ngAfterViewInit(): void {  }
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];
  ngOnInit(): void {
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Görev Adı', field: 'name' }, 
      { headerName: 'Durumu', field: 'status', cellRenderer:'businessStatusFormatterComponent' },
      { headerName: 'Müşteri Adı', field: 'customerName' },
      { headerName: 'Proje Adı', field: 'projectName' },
      { headerName: 'Başlangıç Tarihi', field: 'startDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Bitmesi Gereken Tarih', field: 'time', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Bitiş Tarihi', field: 'endDate', cellRenderer: 'longDateFormatterComponent' }, 
      { headerName: 'Sorumlu Kişi', field: 'userId', cellRenderer: 'userNameFormatterComponent' }, 
      { headerName: 'Oluşturan Kullanıcı', field: 'createUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Oluşturulma Tarihi', field: 'createDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Güncelleyen Kullanıcı', field: 'updateUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Güncellenme Tarihi', field: 'updateDate', cellRenderer: 'longDateFormatterComponent' }
    ];
  }
  run(name: string) {
    if (this[name]) {
      this[name]();
    }
  }
}
