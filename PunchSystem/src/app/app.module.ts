import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MemberprofileComponent } from './memberprofile/memberprofile.component';
import { PunchinComponent } from './punchin/punchin.component';
import { LeaveComponent } from './leave/leave.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { Md5 } from 'ts-md5/dist/md5';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemberprofileComponent,
    PunchinComponent,
    LeaveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Md5],
  bootstrap: [AppComponent]
})
export class AppModule { }
