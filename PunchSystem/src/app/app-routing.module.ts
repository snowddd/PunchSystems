import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberprofileComponent} from './memberprofile/memberprofile.component';
import {LoginComponent} from './login/login.component';
import {LeaveComponent} from './leave/leave.component';
import {PunchinComponent} from './punchin/punchin.component';
const routes: Routes =  [

  // /:id = 必須帶參數才能過去
  {path: '' , redirectTo: 'login' , pathMatch: 'full' },
  {path: 'login' , component: LoginComponent},
  {path: 'member' , component: MemberprofileComponent},
  {path:'leave' , component: LeaveComponent},
  {path:'punch' , component: PunchinComponent}
  // {path: '**' , component: ContetnComponent},
  // {path: '**' , redirectTo: 'home' , pathMatch: 'full' },
  // fallbackRoute
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
