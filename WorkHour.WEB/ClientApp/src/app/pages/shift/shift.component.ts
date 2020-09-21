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
      { headerName: 'Mesai Başlangıç Saati', field: 'startTimeText'},
      { headerName: 'Mesai Bitiş Tarihi', field: 'finishDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Mesai Bitiş Saati', field: 'finishTimeText' },
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
    var time1 = this.grid.newItem.startTimeText;
    var time2 = this.grid.newItem.finishTimeText;
    this.grid.newItem.startTimeText = [time1.slice(0, 2), ":", time1.slice(2)].join('');
    this.grid.newItem.finishTimeText = [time2.slice(0, 2), ":", time2.slice(2)].join('');
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
