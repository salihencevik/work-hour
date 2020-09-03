import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonelComponent } from '../../pages/personel/personel.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from '../../pages/grid/grid.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    ClipboardModule,
    AgGridModule.withComponents([]), 
  ],
  declarations: [
    PersonelComponent,
    GridComponent
  ]
})

export class AdminLayoutModule {}
