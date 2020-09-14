import { Component, OnInit } from '@angular/core'; 
import { PageMode } from '../../shared/Model/PageMode';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];
}
