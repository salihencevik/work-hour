import { Routes } from '@angular/router';
import { PersonelComponent } from '../../pages/personel/personel.component';
import { ShiftComponent } from '../../pages/shift/shift.component';
import { CustomerComponent } from '../../pages/customer/customer.component';
import { ProjectComponent } from '../../pages/project/project.component';
import { DashboardComponent } from '../../pages/dashboard.component';
import { RoleComponent } from '../../pages/role/role.component';
import { ReportComponent } from '../../pages/report/report.component';
import { BusinessComponent } from '../../pages/business/business.component';
import { ProfileComponent } from '../../pages/profile/profile.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Personel', component: PersonelComponent },
  { path: 'Shift', component: ShiftComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'Project', component: ProjectComponent },
  { path: 'Role', component: RoleComponent },
  { path: 'Report', component: ReportComponent },
  { path: 'Business', component: BusinessComponent },
  { path: 'user-profile', component: ProfileComponent },
];
