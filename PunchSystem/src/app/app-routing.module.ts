import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberprofileComponent } from './memberprofile/memberprofile.component';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';
import { PunchinComponent } from './punchin/punchin.component';
import { AuthGuard } from '../app/auth/auth.guard';
const routes: Routes = [

  // /:id = 必須帶參數才能過去
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'member', component: MemberprofileComponent, canActivate: [AuthGuard] },
  { path: 'leave', component: LeaveComponent, canActivate: [AuthGuard] },
  { path: 'punch', component: PunchinComponent, canActivate: [AuthGuard] }
  // {path: '**' , redirectTo: 'home' , pathMatch: 'full' },
  // fallbackRoute
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
