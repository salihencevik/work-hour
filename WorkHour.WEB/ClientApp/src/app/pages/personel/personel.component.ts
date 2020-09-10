import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PageMode } from '../../Model/PageMode';
import { GridComponent } from '../grid/grid.component';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../service/snack-bar/snack-bar.service';
import { RoleService } from '../../service/role/role.service';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css']
})
export class PersonelComponent implements OnInit, AfterViewInit {
  @ViewChild(GridComponent) grid: GridComponent;
  constructor(private httpClient: HttpClient, private snackBarService: SnackBarService, private roleService: RoleService) { }
  ngAfterViewInit(): void {
    this.grid.modeChange.subscribe((m) => {
      this.modeChange(m);
     
    });
    }
  filteredRoles: any;
  roles = [];
  PageModes = PageMode;
  mode = PageMode.List;
  columns: any[];
  passwordRequired: boolean = true;
  ngOnInit(): void {
    this.roleService.getItems(); 
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Adı', field: 'name' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Ünvan', field: 'mission' },
      { headerName: 'Telefon', field: 'phone' },
      { headerName: 'Adres', field: 'adress' }
    ]; 
  }


  modeChange(m) {
    debugger; 
    this.loadRoles();
    if (m == PageMode.Update) {
      this.fillRoles(this.grid.newItem.roles)
      this.reloadFilteredData();
      this.passwordRequired = false;
    }
    if (m == PageMode.Create) {
      this.reloadFilteredData();
      this.passwordRequired = true;
    }
  }

  loadRoles() {
    debugger;
    this.roles.splice(0, this.roles.length);

    var roleItems = this.roleService.getItems(); 
    for (var i = 0; i < roleItems.length; i++) {
      this.roles.push({
        Id: roleItems[i].id,
        Name: roleItems[i].name,
        Checked: false
      });
    }
  }

  filterRoles(value) {
    debugger;
    if (!value) {
      this.copyRoles();
    }
    this.filteredRoles = Object.assign([], this.roles).filter(
      item => item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }
  copyRoles() {
    this.filteredRoles = Object.assign([], this.roles);
  }

  fillRoles(roleIds: any[]) {
    debugger;
    for (var i = 0; i < this.roles.length; i++) {
      var id = this.roles[i].Id;
      var index = roleIds.indexOf(id);
      if (index != -1) {
        this.roles[i].Checked = true;
      }
    }
  }

  reloadFilteredData() {
    this.copyRoles(); 
  }

  backToList() {
    this.mode = PageMode.List;
  }
  save() {
    debugger;
    var roleIds = [];
    for (var i = 0; i < this.roles.length; i++) {
      if (this.roles[i].Checked == true) {
        roleIds.push(this.roles[i].Id);
      }
    }
    this.grid.newItem.roles = roleIds;
    let url = "/Personel/SaveItem";
    this.httpClient.post(url, this.grid.newItem).subscribe(data => {
      if (data != null) {
        this.mode = PageMode.List;
        this.snackBarService.open("Ekleme İşlemi Başarılı")
      }
    });
  }



  run(name: string) {
    if (this[name]) {
      this[name]();
    }
  }




}
