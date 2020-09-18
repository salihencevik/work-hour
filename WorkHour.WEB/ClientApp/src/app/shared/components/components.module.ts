import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { WorkHourSelectComponent } from './work-hour-select/work-hour-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatSnackBarModule,
    //MatSelectModule,
    //MatFormFieldModule,
    //MatInputModule
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ConfirmDialogComponent, 
  ],
  exports: [
    NavbarComponent,
    SidebarComponent, 
  ]
})
export class ComponentsModule { }
