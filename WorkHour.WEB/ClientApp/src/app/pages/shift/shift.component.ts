import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core'; 
import { PageMode } from '../../shared/Model/PageMode';
import { GridComponent } from '../grid/grid.component';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';
import { UserService } from '../../shared/service/user/user.service';
import { AreaType } from '../../shared/enum/enums';
import { DialogService } from '../../shared/service/dialog-service/dialog.service';
import { URLSearchParams } from '@angular/http';
import { PersonelClaimService } from '../../shared/service/personel-claim/personel-claim.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit, AfterViewInit {
  @ViewChild(GridComponent) grid: GridComponent;
  constructor(private rakamHttpService: WorkHourHttpService, private userService: UserService, private dialogService: DialogService, private personelClaimService: PersonelClaimService, private datePipe: DatePipe) { }
  ngAfterViewInit(): void {
    this.grid.modeChange.subscribe((m) => {
      this.modeChange(m); 
    });
    }
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];
  columnDefs;
  public now: Date = new Date();
  @Input() createButtonVisible: boolean = true;
  @Input() editButtonVisible: boolean = true;
  @Input() extraToolbarItems: any[] = [];
  @Input() deleteButtonVisible: boolean = true;
  @Input() doubleRowClick: boolean = true;
  @Input() multiSelect: boolean = false;
  user = [];
  area = []; 
  ngOnInit(): void {
    this.userService.getItems();
    this.area = [
      { id: AreaType.Ofis, name: "Ofis" },
      { id: AreaType.Ev, name: "Ev" },
    ]; 
    this.columns = [ 
      { headerName: 'Id', field: 'id' },
      { headerName: 'Personel Adı', field: 'userId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Mesai Başlangıç Tarihi', field: 'startDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Mesai Başlangıç Saati', field: 'startTimeText'},
      { headerName: 'Mesai Bitiş Tarihi', field: 'finishDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Mesai Bitiş Saati', field: 'finishTimeText' },
      { headerName: 'Çalışma Yeri', field: 'area', cellRenderer: 'areaTypeFormatterComponent' },
      { headerName: 'Açıklama', field: 'explanation' },
      { headerName: "Onaylandı mı?", field: 'workConfirmation', cellRenderer: 'checkFormatterComponent' },
      { headerName: 'Oluşturan Kullanıcı', field: 'createUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Oluşturulma Tarihi', field: 'createDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Güncelleyen Kullanıcı', field: 'updateUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Güncellenme Tarihi', field: 'updateDate', cellRenderer: 'longDateFormatterComponent' }
    ];
    if (this.multiSelect) {
      this.columns.splice(0, 0, { headerName: "Onaylandı mı?", field: 'workConfirmation', cellRenderer: 'checkBoxRendererComponent' })
    } 
  }
  backToList() {
    this.mode = PageMode.List;
  }


  modeChange(m) {
    this.user = this.userService.getItems();
    if (m == PageMode.Create) {  
      this.grid.newItem.startDate = this.datePipe.transform(this.now, "yyyy-MM-dd"); 
      this.grid.newItem.finishDate = this.datePipe.transform(this.now, "yyyy-MM-dd");
      this.grid.newItem.startTimeText = "08:30";
      this.grid.newItem.finishTimeText = "17:30";
      this.grid.newItem.area = AreaType.Ofis;
    }
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
          this.grid.reloadTable(); 
        }
        this.mode = PageMode.List; 
      }
    }, null);
  }
  allConfirmShift() { 
    this.dialogService
      .confirm('EMİN MİSİNİZ',  'Onaylı olmayan tüm kayıtlar onaylanacak.')
      .subscribe(res => {
        if (res) {
          this.rakamHttpService.httpPost('/Shift/AllConfirm', null, null, (data) => {
            this.grid.reloadTable();
          }, null);
        }
      });
  }
  checkClaim(claimText) { 
    return this.personelClaimService.checkClaim(claimText); 
  }
  run(name: string) {
    if (this[name]) {
      this[name]();
    }
  }
}
