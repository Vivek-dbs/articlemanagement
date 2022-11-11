import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {path: 'auth', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: 'admin', canActivate: [AuthenticationGuard], loadChildren:()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path: 'user', canActivate: [AuthenticationGuard], loadChildren:()=> import('./user/user.module').then(m=>m.UserModule)},
  {path: '', redirectTo:'admin',pathMatch:'full'},
  {path:'**',redirectTo:'auth',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
