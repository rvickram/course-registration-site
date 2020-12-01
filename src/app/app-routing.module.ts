import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MyAccountComponent } from './my-account/my-account.component';


const routes: Routes = [
  { path: 'home', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'my-account', component: MyAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
