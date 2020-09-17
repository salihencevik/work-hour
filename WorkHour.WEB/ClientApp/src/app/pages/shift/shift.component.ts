import { Component, OnInit } from '@angular/core'; 
import { PageMode } from '../../shared/Model/PageMode';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  constructor() { }
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];
  ngOnInit(): void {
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Personel Adı', field: 'userId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Mesai Başlangıç', field: 'startTime', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Mesai Bitiş', field: 'finishTime', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Çalışma Yeri', field: 'area' },
      { headerName: 'Açıklama', field: 'explanation' },
      { headerName: 'Oluşturan Kullanıcı', field: 'createUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Oluşturulma Tarihi', field: 'createDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Güncelleyen Kullanıcı', field: 'updateUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Güncellenme Tarihi', field: 'updateDate', cellRenderer: 'longDateFormatterComponent' }
    ];
  }

}
