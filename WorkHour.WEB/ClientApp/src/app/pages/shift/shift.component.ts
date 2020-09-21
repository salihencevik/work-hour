import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'; 
import { PageMode } from '../../shared/Model/PageMode';
import { GridComponent } from '../grid/grid.component';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';
import { UserService } from '../../shared/service/user/user.service';
import { AreaType } from '../../shared/enum/enums';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit, AfterViewInit {
  @ViewChild(GridComponent) grid: GridComponent;
  constructor(private rakamHttpService: WorkHourHttpService, private userService: UserService) { }
    ngAfterViewInit(): void { 
    }
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];
  user = [];
  area = [];
  ngOnInit(): void {
    this.area = [
      { id: AreaType.Ofis, name: "Ofis" },
      { id: AreaType.Ev, name: "Ev" },
    ];
    this.user = this.userService.getItems();
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Personel Adı', field: 'userId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Mesai Başlangıç Tarihi', field: 'startDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Mesai Başlangıç Saati', field: 'startTime'},
      { headerName: 'Mesai Bitiş Tarihi', field: 'finishDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Mesai Bitiş Saati', field: 'finishTime' },
      { headerName: 'Çalışma Yeri', field: 'area', cellRenderer: 'areaTypeFormatterComponent' },
      { headerName: 'Açıklama', field: 'explanation' },
      { headerName: 'Oluşturan Kullanıcı', field: 'createUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Oluşturulma Tarihi', field: 'createDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Güncelleyen Kullanıcı', field: 'updateUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Güncellenme Tarihi', field: 'updateDate', cellRenderer: 'longDateFormatterComponent' }
    ];
  }
  backToList() {
    this.mode = PageMode.List;
  }
  save() {
    debugger;
    var body = this.grid.newItem;
    var query = this.grid.newItem.startTime;
    this.grid.newItem.startTime = query.splice(3, ":");
    this.rakamHttpService.httpPost('/Shift/SaveItem', body, null, (data) => {
      debugger;
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
