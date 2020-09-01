import { Component, OnInit } from '@angular/core';
import { PageMode } from '../../Model/PageMode';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css']
})
export class PersonelComponent implements OnInit {
 
  constructor() { }


  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[]; 

  ngOnInit(): void { 
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Adı', field: 'name' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Ünvan', field: 'mission' },
      { headerName: 'Telefon', field: 'Phone' },
      { headerName: 'Adres', field: 'adress' }
    ]; 
  }
  run(name: string) {
    if (this[name]) {
      this[name]();
    }
  }
}
