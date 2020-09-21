import { Routes } from '@angular/router';
import { PersonelComponent } from '../../pages/personel/personel.component';
import { ShiftComponent } from '../../pages/shift/shift.component';
import { CustomerComponent } from '../../pages/customer/customer.component';
import { ProjectComponent } from '../../pages/project/project.component';
import { DashboardComponent } from '../../pages/dashboard.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Personel', component: PersonelComponent },
  { path: 'Shift', component: ShiftComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'Project', component: ProjectComponent },
];
