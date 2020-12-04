import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ScheduleDashboardComponent } from './schedule-dashboard/schedule-dashboard.component';

import { AuthGuardService } from './_services/auth-guard.service';


const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'schedules', component: ScheduleDashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
