import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthenticationGuard } from './shared/service/authentication-guard/authentication.guard';
const routes: Routes =[
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule', canActivate: [AuthenticationGuard] }
    ]
  },
  { path: '', component: AuthLayoutComponent,
    children: [
    { path: 'session', loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
