import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageMode, PropertyType } from '../../shared/Model/PageMode';
import { DialogService } from '../../shared/service/dialog-service/dialog.service';
import { PersonelClaimService } from '../../shared/service/personel-claim/personel-claim.service';
import { SnackBarService } from '../../shared/service/snack-bar/snack-bar.service';
import { LongDateFormatterComponent } from '../../shared/formatter/longDateFormatter';
import { UsernameFormatterComponent } from '../../shared/formatter/usernameFormatter';
import { IGetRowsParams, ColDef } from 'ag-grid-community';
import { Headers, Http } from '@angular/http';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';
import { URLSearchParams } from '@angular/http';
import { CheckFormatterComponent } from '../../shared/formatter/checkFormatter';
import { CustomerNameFormatterComponent } from '../../shared/formatter/customerNameFormatter';
import { TranslateService } from '@ngx-translate/core';
import GridTraslator from './grid-translator';
import { AreaTypeFormatterComponent } from '../../shared/formatter/areaTypeFormatter';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() entityName: string;
  hdr: any = undefined;
  @Input() columns: any[];
  @Input() mode: PageMode;
  @Input() Authority: string;
  @Input() createButtonVisible = true;
  @Input() useSizeColumnsToFit = true;
  @Input() copyButtonVisible = false;
  @Input() viewButtonVisible = true;
  @Input() editButtonVisible = true;
  columnDefs: ColDef[];
  @Input() deleteButtonVisible = true;
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  @Output() createNewItem = new EventEmitter(); 
  @Output() call: EventEmitter<any> = new EventEmitter();
  @Input() enableRowDobuleClick = true;
  selected: any[] = [];
  @Input() serverSidePaging = true;
  @Input() customHeight: any;
  @Input() childView: boolean = false;
  @Output() modeChange = new EventEmitter();
  frameworkComponents
  defaultColDef;
  rowId: number;
  rows = [];
  @Output() onGridReadyEvent = new EventEmitter();
  private gridApi;
  deleteButton: any;
  copyButton: any;
  viewButton: any;
  editButton: any;
  createButton: any;
  dateFormat: string;
  longDateFormat: string;
  callbackApi;
  public newItem: any;
  public updateData: any;
  private gridColumnApi;
  private rowSelection;
  private rowModelType;
  private rowData: [];
  private toolbarItems: any[];
  dataSource;
  dataSourceArray = [];
  page = {
    limit: 25,
    count: 0,
    offset: 0,
    orderBy: '',
    orderDir: 'desc'
  };
  paginationPageSize;
  cacheOverflowSize;
  maxConcurrentDatasourceRequests;
  infiniteInitialRowCount;
  maxBlocksInCache;
  gridLocaleText = {};
  constructor(
    private dialogService: DialogService,
    private rakamhttpService: WorkHourHttpService,
    private httpClient: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private personelClaimService: PersonelClaimService,
    private snackBarService: SnackBarService,
    private translate: TranslateService) {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    };

    this.rowSelection = "single";
    this.rowModelType = "infinite";
    this.columnDefs = [];
    this.paginationPageSize = this.page.limit;
    this.cacheOverflowSize = 0;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = this.page.limit;
    this.maxBlocksInCache = 1;
  }
  private propertyTypeList: Map<string, PropertyType> = new Map<string, PropertyType>();
  ngOnInit(): void {
    if (!this.customHeight) {
      if (this.childView) {
        this.customHeight = "100%";
      }
      else {
        this.customHeight = "calc(100vh - 155px)";
      }
    }
    this.createFrameworkComponent();

    this.initToolbarItems();

    this.createColumns(this.columns);
  }

  setGridLocaleText() {
    this.gridLocaleText = GridTraslator.GetTranslatedText(this.translate);
  }

  initToolbarItems() {
    this.toolbarItems = [];
    if (this.createButtonVisible) {
      this.createButton = {
        text: 'CREATE_NEW',
        icon: 'add_circle',
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

    this.toolbarItems.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
  }

  createColumns(columns: any[]) {
    if (!columns) {
      console.log("GridComponent => Not found columns");
      return;
    }
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      //propType verilmezse gridde filtre penceresi acilmaz
      this.propertyTypeList.set(column.prop, column.propType);
      if (column.name == "Id") {
        this.columnDefs.push({
          headerName: column.headerName,
          field: column.field != undefined ? column.field : column.prop,
          cellRenderer: column.cellRenderer,
          width: column.width != undefined ? column.width : 200,
          sort: column.sort != undefined ? column.sort : 'desc',
          cellClass: column.cellClass != undefined ? column.cellClass : 'stringType'
        });
      }
      else {
        this.columnDefs.push({
          headerName: column.headerName,
          field: column.field != undefined ? column.field : column.prop,
          cellRenderer: column.cellRenderer,
          width: column.width != undefined ? column.width : 200,
          sort: column.sort != undefined ? column.sort : '',
          cellRendererParams: column.cellRendererParams != undefined ? column.cellRendererParams : null,
          cellClass: column.cellClass != undefined ? column.cellClass : 'stringType'
        });

      }
    }
  }
  getGridFilterTemplate(propType: PropertyType): any {
    switch (propType) {
      case PropertyType.Number: {
        return "agNumberColumnFilter";
      }
      case PropertyType.Text: {
        return true;
      }
      default:
        break;
    }
    return null;
  }
  run(name: string, toolbarMethod: boolean) {
    if (!toolbarMethod) {

      this.call.emit(name);
    }
    else {
      if (this[name]) {
        this[name]();
      }
    }
  }
  createFrameworkComponent() {
    this.frameworkComponents = {
      longDateFormatterComponent: LongDateFormatterComponent,
      userNameFormatterComponent: UsernameFormatterComponent,
      areaTypeFormatterComponent: AreaTypeFormatterComponent,
      checkFormatterComponent: CheckFormatterComponent,
      customerNameFormatterComponent: CustomerNameFormatterComponent
    }
  }


  onGridReady(params) {
    this.gridApi = params.api;
    if (this.useSizeColumnsToFit == true) {
      this.gridApi.sizeColumnsToFit();
    }
    this.gridColumnApi = params.columnApi;
    if (this.serverSidePaging) {
      let that = this;
      var dataSource = {
        rowCount: null,

        getRows: function (params) {
          that.callbackApi = params;
          that.reloadAgGrid(params);
        }
      };
      params.api.setDatasource(dataSource);
    }

    this.onGridReadyEvent.emit();
  }

  reloadAgGrid(params: IGetRowsParams) {
    this.page.offset = params.startRow / this.page.limit;
    if (params.sortModel && params.sortModel.length > 0) {
      this.page.orderDir = params.sortModel[0].sort;
      this.page.orderBy = params.sortModel[0].colId;
    } else {
      this.page.orderBy = null;
      this.page.orderDir = null;
    }
    this.reloadTable();
  }

  reloadTable() {
    var params = new URLSearchParams();
    params.set('orderColumn', this.page.orderBy);
    params.set('orderDir', this.page.orderDir);
    params.set('pageNumber', this.page.offset.toString());
    params.set('pageSize', this.page.limit.toString());
    let url = "/" + this.entityName + "/" + "GetItems";
    this.rakamhttpService.httpGet(url, params, null, (data) => {
      console.log(data);
      if (data.responseType == 3) {
        this.snackBarService.open(data.message);
      }
      else {
        this.selected = [];
        this.page.count = data.item.count;
        this.rows = data.item.items;
        this.callbackApi.successCallback(this.rows, this.page.count);
      } 
    }, null);
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


  onPageCountChanged(param) {
    var val = Number(param.value);
    this.gridApi.gridOptionsWrapper.setProperty('cacheBlockSize', val);
    this.page.limit = val;
    this.gridApi.paginationSetPageSize(val);
  }

  delete() {
    var row = this.selected[0];
    this.dialogService
      .confirm('EMİN MİSİNİZ', 'SİLMEK İSTİYORUM')
      .subscribe(res => {
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
    var params = new URLSearchParams();
    params.append('id', id.toString()); 
    var url = '/' + this.entityName + '/GetItem' + "/" + id;
    this.rakamhttpService.httpGet(url, params, null, (data) => {
      this.newItem = data.item;
      this.mode = PageMode.Update;
      this.changeDetectorRef.detectChanges();

      this.modeChange.emit(this.mode);
    },null);

  }
  addItem(item) {
    debugger;
    this.rows.push(item);
    this.page.count = this.rows.length;
    this.loadRows(this.rows);
  }
  loadRows(items) {
    this.page.count = items.length;
    this.rows = items;

    if (this.callbackApi) {
      this.callbackApi.successCallback(this.rows, this.rows.length);
    }
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
