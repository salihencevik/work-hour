import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { PageMode } from '../../Model/PageMode';
import { HttpClient } from '@angular/common/http';
import { PersonelClaimService } from '../../service/personel-claim/personel-claim.service';
import { SnackBarService } from '../../service/snack-bar/snack-bar.service';
import { DialogService } from '../../service/dialog-service/dialog.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() entityName: string;
  @Input() columns: any[];
  @Input() mode: PageMode;
  @Input() Authority: string;
  @Input() createButtonVisible = true;
  @Input() copyButtonVisible = false;
  @Input() viewButtonVisible = true;
  @Input() editButtonVisible = true;
  @Input() deleteButtonVisible = true;
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  @Output() createNewItem = new EventEmitter();
  @Output() call: EventEmitter<any> = new EventEmitter();
  @Input() enableRowDobuleClick = true;
  selected: any[] = [];
  @Input() serverSidePaging = true;
  @Output() modeChange = new EventEmitter();

  rowId: number;
  rows = [];
  private gridApi;
  deleteButton: any;
  copyButton: any;
  viewButton: any;
  editButton: any;
  createButton: any;
  dateFormat: string;
  longDateFormat: string;
  public newItem: any;
  public updateData: any;
  private gridColumnApi;
  private rowSelection;
  private rowModelType;
  private rowData: [];
  private columnDefs: any[];
  private toolbarItems: any[];
  dataSource;
  dataSourceArray = [];


  constructor(
    private dialogService: DialogService, private httpClient: HttpClient, private changeDetectorRef: ChangeDetectorRef, private personelClaimService: PersonelClaimService, private snackBarService: SnackBarService) {
    this.rowSelection = "single";
    this.rowModelType = "infinite";
  }

  ngOnInit(): void {
    this.toolbarItems = [];
    if (this.createButtonVisible) {
      this.createButton = {
        text: 'CREATE_NEW',
        //icon: 'add_circle',
        method: "createNew",
        toolbarMethod: true,
        claimText: this.entityName + '.Insert',
        css: 'newButton',
        order: 100,
        disableWhenNoSelection: false,
        disabled: false
      };

      this.toolbarItems.push(this.createButton);
    }


    if (this.viewButtonVisible) {
      this.viewButton = {
        text: 'REVIEW',
        //    icon: 'pageview',
        method: "view",
        toolbarMethod: true,
        claimText: this.entityName + '.View',
        css: 'viewButton',
        order: 200,
        disableWhenNoSelection: true,
        disabled: true
      };
      this.toolbarItems.push(this.viewButton);
    }

    if (this.editButtonVisible) {
      this.editButton = {
        text: 'EDIT',
        //   icon: 'edit',
        method: "edit",
        toolbarMethod: true,
        claimText: this.entityName + '.Update',
        css: 'editButton',
        order: 200,
        disableWhenNoSelection: true,
        disabled: true
      };
      this.toolbarItems.push(this.editButton);
    }

    if (this.deleteButtonVisible) {
      this.deleteButton = {
        text: 'DELETE',
        //   icon: 'delete',
        method: "delete",
        toolbarMethod: true,
        claimText: this.entityName + '.Delete',
        css: 'deleteButton',
        order: 300,
        disableWhenNoSelection: true,
        disabled: true
      };
      this.toolbarItems.push(this.deleteButton);
    }
  }

  run(name: string, toolbarMethod: boolean) {
    debugger;
    if (!toolbarMethod) {

      this.call.emit(name);
    }
    else {
      if (this[name]) {
        this[name]();
      }
    }
  }

  onGridReady(params) {
    debugger;
    if (this.personelClaimService.checkClaim(this.Authority)) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.columnDefs = this.columns;
      let url = "/" + this.entityName + "/" + "getItems";
      this.httpClient.get(url).subscribe((data: any) => { 
        this.dataSource = params.api.setRowData(data.item); 
      });
    } else {
      this.snackBarService.open("Yetkiniz bulunamadı --> " + this.Authority);
    }

  }
  createNew(item: any = null) { 
    this.newItem = { id: 0 }; 
    this.createNewItem.emit();
    this.mode = PageMode.Create;
    this.modeChange.emit(this.mode);
  }
  checkClaim(claimText) {
    return claimText == undefined || claimText == null || claimText == '' || this.personelClaimService.checkClaim(claimText);
  }



  delete() {
    var row = this.selected[0];
    this.dialogService
      .confirm('EMİN MİSİNİZ', 'SİLMEK İSTİYORUM')
      .subscribe(res => {

        debugger;
        if (res) {
          var body = row.id;
          this.httpClient.post('/' + this.entityName + '/Delete', body).subscribe((data) => {

            var index = this.rows.findIndex(t => t.Id == row.Id);

            if (index != -1) {
              this.rows.splice(index, 1);

            }

            this.gridApi.updateRowData({ remove: [this.getSelectedItem()] });
            this.selected[0] = this.rows[0];

          });
        }


      });
  }

  getSelectedItem() {
    if (this.selected == null || this.selected.length == 0) {
      return null;
    }

    return this.selected[0];
  }




  onSelectionChanged() {
    debugger;
    var selectedRows = this.gridApi.getSelectedRows();
    this.selected = selectedRows;
    this.selectCallback();
  }
  hasSelect() {
    return this.selected.length > 0;
  }
  selectCallback() {
    this.checkButtonsDisable();
    if (this.selectedChanged) {
      this.selectedChanged.emit(this.selected);
    }
  }
  checkButtonsDisable() {
    if (this.toolbarItems != null && this.toolbarItems != undefined) {
      for (var i = 0; i < this.toolbarItems.length; i++) {
        if (this.toolbarItems[i].disableWhenNoSelection == true) {
          this.toolbarItems[i].disabled = !this.hasSelect();
        }
      }
    }
  }

  rowDoubleClicked($event) {
    if (this.personelClaimService.checkClaim(this.entityName + '.Update') && this.enableRowDobuleClick) {
      this.edit();
    }
  }
  edit() {  
    var row = this.selected[0];
    this.itemEdit(row.id);
  }
  itemEdit(id: number) {


    var url = '/' + this.entityName + '/GetItem' + "/" + id;
    this.httpClient.get(url).subscribe((data: any) => {
      console.log(data);
      this.newItem = data.item;
      this.mode = PageMode.Update;
      this.changeDetectorRef.detectChanges();
      this.modeChange.emit(this.mode);
    }); 
   
  }
  //delete(id: number) {
  //  //if (id != undefined) {
  //  //  Swal.fire({
  //  //    title: 'Kayıt silinsin mi?!',
  //  //    icon: 'warning',
  //  //    showCancelButton: true,
  //  //    confirmButtonText: 'Evet',
  //  //    cancelButtonText: 'Hayır',
  //  //    reverseButtons: true
  //  //  }).then((willDelete) => {
  //  //    if (willDelete.value) {
  //  //      this.defaultService.delete(this.entityName, this.rowId).subscribe(data => {
  //  //        var selectedData = this.gridApi.getSelectedRows();
  //  //        var res = this.gridApi.updateRowData({ remove: selectedData });
  //  //      })
  //  //    }
  //  //  })
  //  //}
  //} 
}
