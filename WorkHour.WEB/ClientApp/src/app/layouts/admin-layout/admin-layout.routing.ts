import { Routes } from '@angular/router';
import { PersonelComponent } from '../../pages/personel/personel.component';
import { ShiftComponent } from '../../pages/shift/shift.component';
 

export const AdminLayoutRoutes: Routes = [
  { path: 'Personel', component: PersonelComponent },
  { path: 'Shift', component: ShiftComponent },
];
