import { Component } from '@angular/core';

@Component({
  selector: 'app-time-formatter-cell',
  template: `
    <span *ngIf="timeFormat != null">{{params.value | date: timeFormat}}</span>
    <span *ngIf="timeFormat == null">{{params.value | date}}</span>
  `
})

export class TimeFormatterComponent {
  params: any;
  timeFormat: string;

  constructor() {
    debugger;
    this.timeFormat = "h:mm:ss a"
  }

  agInit(params: any): void {
    this.params = params;
  }
}
