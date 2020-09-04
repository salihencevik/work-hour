import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PageMode } from '../../Model/PageMode';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css']
})
export class PersonelComponent implements OnInit, AfterViewInit {
  @ViewChild(GridComponent) grid: GridComponent;
  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.grid); 
    }


  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[]; 

  ngOnInit(): void { 
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Adı', field: 'name' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Ünvan', field: 'mission' },
      { headerName: 'Telefon', field: 'phone' },
      { headerName: 'Adres', field: 'adress' }
    ]; 
  }
  run(name: string) {
    if (this[name]) {
      this[name]();
    }
  }
  backToList() {
    this.mode = PageMode.List;
  }
  save() {
    console.log("Gitti");
  }
}
