import { Routes } from '@angular/router';
import { PlainLayout } from './shared/layouts/plain/plain.layout';
import { AdminLayout } from './shared/layouts/admin/admin.layout';
import { LoginPage } from './features/auth/pages/login/login.page';
import { RegisterPage } from './features/auth/pages/register/register.page';

export const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full', title: 'Home' },
  //   { path: 'admin', component: Admin, title: 'Dashboard' },
  {
    path: 'sign-in',
    component: PlainLayout,
    children: [{ path: '', component: LoginPage, title: 'Sign In' }],
  },
  {
    path: 'sign-up',
    component: PlainLayout,
    children: [{ path: '', component: RegisterPage, title: 'Sign Up' }],
  },
  /*
  {
    path: 'sign-out',
    component: PlainLayout,
    children: [{ path: '', component: Logout, title: 'Sign Out' }],
  },
  */
  {
    path: 'admin',
    component: AdminLayout,
    title: 'Dashboard',
  },
];
