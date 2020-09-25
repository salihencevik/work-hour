import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor() { }
  extraToolbarItems = [{
    text: 'Tümünü Onayla',
    //icon: 'insert_drive_file',
    method: "allConfirmShift",
    toolbarMethod: false,
    claimText: 'Rapor.Onayla', 
    order: 100,
    disableWhenNoSelection: false,
    disabled: false
  }];
  ngOnInit(): void {

  }

}
