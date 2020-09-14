import { Component } from '@angular/core';

@Component({
  selector: 'app-longdate-formatter-cell',
  template: `
    <span *ngIf="longDateFormat != null">{{params.value | date: longDateFormat}}</span>
    <span *ngIf="longDateFormat == null">{{params.value | date}}</span>
  `
})

export class LongDateFormatterComponent {
  params: any;
  longDateFormat: string;

  constructor() {
    this.longDateFormat = "dd.MM.yyyy HH:mm:ss"
  }

  agInit(params: any): void {
    this.params = params;
  }
}
