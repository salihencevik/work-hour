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
import { CheckboxRenderer } from '../../shared/formatter/checkBoxRenderer';
import { ConditionTypeMapper } from './grid-filter';
import { TimeFormatterComponent } from '../../shared/formatter/timeFormatter';
import { BusinessStatusFormaterComponent } from '../../shared/formatter/businessStatusFormatter';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
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
  @Input() exportButtonVisible = true;
  columnDefs: ColDef[];
  @Input() deleteButtonVisible = true;
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  @Output() createNewItem = new EventEmitter();
  @Output() call: EventEmitter<any> = new EventEmitter();
  @Input() enableRowDobuleClick = true;
  @Input() refreshListButtonVisible = true;
  selected: any[] = [];
  @Input() serverSidePaging = true;
  @Input() customHeight: any;
  @Input() extraToolbarItems: any[] = [];
  @Input() rowDoubleClick: boolean = true;
  @Input() childView: boolean = false;
  @Output() modeChange = new EventEmitter();
  @Output() copyItem = new EventEmitter();
  isCopy: boolean = false;
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
  exportButton: any;
  createButton: any;
  rowBuffer;
  dateFormat: string;
  @Input() multiRowSelection = false;
  longDateFormat: string;
  callbackApi;
  public newItem: any;
  public updateData: any;
  private gridColumnApi;
  private rowSelection;
  private rowModelType;
  private rowData: [];
  private toolbarItems: any[];
  private getRowStyle;
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
  conditionTypeMapper = new ConditionTypeMapper();
  constructor(
    private dialogService: DialogService,
    private rakamhttpService: WorkHourHttpService, 
    private changeDetectorRef: ChangeDetectorRef,
    private personelClaimService: PersonelClaimService,
    private snackBarService: SnackBarService,
    private translate: TranslateService) {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    };
    this.columnDefs = [];
    this.rowBuffer = 0; 
    
    
    this.rowModelType = "infinite";
    this.paginationPageSize = this.page.limit;
    this.cacheOverflowSize = 0;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = this.page.limit;
    this.maxBlocksInCache = 1;
  }
  private propertyTypeList: Map<string, PropertyType> = new Map<string, PropertyType>();
  ngOnInit(): void { 
    if (!this.multiRowSelection) {
      this.rowSelection = "single";
    } else {
      this.rowSelection = 'multiple';
    }
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

    this.setGridLocaleText();
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
        order: 350,
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
    if (this.copyButtonVisible) {
      this.copyButton = {
        text: 'COPY',
        icon: 'file_copy',
        method: "copy",
        toolbarMethod: true,
        claimText: this.entityName + '.Copy',
        css: 'copyButton',
        order: 400,
        disableWhenNoSelection: true,
        disabled: true
      };
      this.toolbarItems.push(this.copyButton);
    };
    if (this.exportButtonVisible) {
      this.exportButton = {
        text: 'EXPORT',
        icon: 'file_copy',
        method: "exportExcel",
        toolbarMethod: true,
        claimText: this.entityName + '.ExportToExcel',
        css: 'copyButton',
        order: 500,
        disableWhenNoSelection: false,
        disabled: false
      };
      this.toolbarItems.push(this.exportButton);
    }; 
    if (this.extraToolbarItems != null) {
      for (var i = 0; i < this.extraToolbarItems.length; i++) {
        this.toolbarItems.push(this.extraToolbarItems[i]);
      }
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
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  exportExcel() { 
    var params = new URLSearchParams();
    params.set('orderColumn', this.page.orderBy);
    params.set('orderDir', this.page.orderDir);
    params.set('pageNumber', this.page.offset.toString());
    params.set('pageSize', this.page.limit.toString());  

    this.rakamhttpService.httpGet(this.entityName + '/GetItems', params, null, (data) => {
      debugger;
      var filename = this.entityName + ".xlsx";
      var filetype = "application/ms-excel";
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.item.items);
      const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveExcelFile(excelBuffer, filename); 
    }, null);
  }
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  copy() {
    this.isCopy = true;
    this.copyItem.emit();
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
      if (column.headerName == "Id") {
        this.columnDefs.push({
          headerName: column.headerName,
          field: column.field != undefined ? column.field : column.prop,
          cellRenderer: column.cellRenderer,
          width: column.width != undefined ? column.width : 200,
          sort: column.sort != undefined ? column.sort : 'desc',
          filter: "agNumberColumnFilter",
        });
      }
      else {
        this.columnDefs.push({
          headerName: column.headerName,
          headerCheckboxSelection: column.headerCheckboxSelection != undefined ? column.headerCheckboxSelection : false,
          checkboxSelection: column.checkboxSelection != undefined ? column.checkboxSelection : false,
          field: column.field != undefined ? column.field : column.prop,
          cellRenderer: column.cellRenderer,
          width: column.width != undefined ? column.width : 200,
          sort: column.sort != undefined ? column.sort : '',
          filter: column.propType != undefined ? this.getGridFilterTemplate(column.propType) : false,
          cellRendererParams: column.cellRendererParams != undefined ? column.cellRendererParams : null,
          cellClass: column.cellClass != undefined ? column.cellClass : 'stringType'
        });

      }
    }
  }
  view() {
    var row = this.selected[0];
    this.itemView(row.id);
  }
  itemView(id: number) {
    var params = new URLSearchParams();
    params.append('id', id.toString());
    var url = '/' + this.entityName + '/GetItem' + "/" + id;
    this.rakamhttpService.httpGet(url, params, null, (data) => {
      this.newItem = data.item;
      this.mode = PageMode.View;
      this.changeDetectorRef.detectChanges(); 
      this.modeChange.emit(this.mode);
    }, null);

  }
  getGridFilterTemplate(propType: PropertyType): any {
    switch (propType) {
      case PropertyType.Number: {
        return "agNumberColumnFilter";
      }
      case PropertyType.Text: {
        return "agTextColumnFilter";
      }
      case PropertyType.Boolean:
      case PropertyType.Selection: {
        return "agSetColumnFilter";
      }
      case PropertyType.Date: {
        return "agDateColumnFilter";
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
      customerNameFormatterComponent: CustomerNameFormatterComponent,
      checkBoxRendererComponent: CheckboxRenderer,
      timeFormatterComponent: TimeFormatterComponent,
      businessStatusFormatterComponent: BusinessStatusFormaterComponent
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

    //this.gridApi.columnController.columnDefs.find(x => x.field == "Id") 
    this.reloadTable();
  }

  reloadTable() {
    this.clearRows();
    var params = new URLSearchParams();
    params.set('orderColumn', this.page.orderBy);
    params.set('orderDir', this.page.orderDir);
    params.set('pageNumber', this.page.offset.toString());
    params.set('pageSize', this.page.limit.toString());
    let url = "/" + this.entityName + "/" + "GetItems";
    this.rakamhttpService.httpGet(url, params, null, (data) => { 
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

  clearRows() {
    this.rows.splice(0, this.rows.length);
    this.gridApi.deselectAll();
    this.checkButtonsDisable();
  }
  onPageCountChanged(param) { 
    var val = Number(param.value);
    this.gridApi.gridOptionsWrapper.setProperty('cacheBlockSize', Number(val));
    this.gridApi.infiniteRowModel.resetCache();

    //this.gridApi.infinitePageRowModel.resetCache();
    this.page.limit = val;
    this.gridApi.paginationSetPageSize(val);
  }
  setRowStyle(params) {

    //if (params.api.entityName == 'ParticipationInstallmentItem') { 
    //  if (params.data.DateOfPayment > params.data.DueDate || params.data.ClosedAmount < params.data.Amount) {
    //    return { 'background-color': 'red', 'color' : 'white' }
    //  }
    //}
    return null;
  }

  delete() {
    var row = this.selected[0];
    this.dialogService
      .confirm('EMİN MİSİNİZ', 'SİLMEK İSTİYORUM')
      .subscribe(res => {
        if (res) {
          var body = row.id;
          this.rakamhttpService.httpPost(this.entityName + '/Delete', body, null, (data) => {
            var index = this.rows.findIndex(t => t.id == row.id);
            if (index != -1) {
              this.rows.splice(index, 1);

              if (this.serverSidePaging) {
                this.loadRows(this.rows);
              }
              else {
                this.gridApi.updateRowData({ remove: [this.getSelectedItem()] });
              }
            }

            this.selected[0] = this.rows[0];
          }, null);
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
    if (this.rowDoubleClick) {
      if (this.personelClaimService.checkClaim(this.entityName + '.Update') && this.enableRowDobuleClick) {
        this.edit();
      }
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
    }, null);

  }

  onClick() {
    this.gridApi.paginationGoToFirstPage();
  }

  onFilterList() {
    this.onClick();
  }

  addItem(item) {
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
}
