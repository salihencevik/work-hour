import { Component, OnInit, ElementRef } from '@angular/core'; 
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(private loginService: LoginService,location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
     
  }     
  logout() {
    this.loginService.logout()
  }
}
