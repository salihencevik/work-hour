import { Routes } from '@angular/router';
import { PersonelComponent } from '../../pages/personel/personel.component';
import { ShiftComponent } from '../../pages/shift/shift.component';
import { CustomerComponent } from '../../pages/customer/customer.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'Personel', component: PersonelComponent },
  { path: 'Shift', component: ShiftComponent },
  { path: 'Customer', component: CustomerComponent },
];
