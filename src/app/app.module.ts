import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import "firebase/auth";
import "firebase/firestore";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PubSchedulesComponent } from './pub-schedules/pub-schedules.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { ScheduleDashboardComponent } from './schedule-dashboard/schedule-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageComponent,
    LoginComponent,
    CreateAccountComponent,
    DashboardComponent,
    MyAccountComponent,
    PubSchedulesComponent,
    SearchComponent,
    ScheduleDashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
