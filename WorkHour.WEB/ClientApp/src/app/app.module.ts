import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing'; 
import { GridComponent } from './pages/grid/grid.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShiftComponent } from './pages/shift/shift.component';
import { ComponentsModule } from './shared/components/components.module';
import { SharedModule } from './shared/shared.module';
import { Http, HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    HttpModule,
    ComponentsModule,
    NgbModule,
    RouterModule,  
    AppRoutingModule,
    MatDialogModule,
    ComponentsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
