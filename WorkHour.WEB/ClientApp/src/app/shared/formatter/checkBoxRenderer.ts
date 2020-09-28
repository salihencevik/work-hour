import { Component, OnDestroy } from '@angular/core';
import { WorkHourHttpService } from '../service/http/workHourHttp';
import { DialogService } from '../service/dialog-service/dialog.service';
 

@Component({
  selector: 'checkbox-renderer',
  template: ` <input  (click)="checkedChange($event.target.checked,params.data.id)"  type="checkbox" [checked]="params.value" 
    />
`,
})
 
export class CheckboxRenderer {
  private params: any;
  warning: string;
  constructor(private rakamHttpService: WorkHourHttpService, private dialogService: DialogService ) { }
 

  agInit(params: any): void {
    this.params = params;
    console.log(params);
  }
  checkedChange(event, id) {
    debugger;
    if (event) { this.warning = "Mesai girişi onaylanacak." }
    else { this.warning = "Mesai girişi onayı kaldırılacak." }
    this.dialogService
      .confirm('EMİN MİSİNİZ', this.warning)
      .subscribe(res => {
        if (res) {
          this.rakamHttpService.httpPost('/Shift/Confirm', id, null, (data) => {

          }, null);
        }
      });
  }
  checkName(params: any) { 
  }
}
