import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid/grid.component';
import { PersonelComponent } from './personel/personel.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShiftComponent } from './shift/shift.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomerComponent } from './customer/customer.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ProjectComponent } from './project/project.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { WorkHourSelectComponent } from '../shared/components/work-hour-select/work-hour-select.component';
import { DashboardComponent } from './dashboard.component';
import { RoleComponent } from './role/role.component';
import { ReportComponent } from './report/report.component';
import { BusinessComponent } from './business/business.component';
import { ProfileComponent } from './profile/profile.component';
import { BlockUIModule } from 'ng-block-ui';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule, 
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,  
    AgGridModule.withComponents([]),
    ComponentsModule,
    TranslateModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
    BlockUIModule
  ],
  declarations: [
    PersonelComponent,
    GridComponent,
    ShiftComponent,
    CustomerComponent,
    ProjectComponent,
    WorkHourSelectComponent,
    DashboardComponent,
    RoleComponent,
    ReportComponent,
    BusinessComponent,
    ProfileComponent
  ],
  providers: [
    MatDatepickerModule,
    [DatePipe],
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' }
  ]
})

export class PagesModule { }
