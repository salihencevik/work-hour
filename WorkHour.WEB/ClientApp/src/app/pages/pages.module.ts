import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
    ReactiveFormsModule,
    MatButtonModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    PersonelComponent,
    GridComponent,
    ShiftComponent
  ]
})

export class PagesModule { }
