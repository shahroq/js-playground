import { Routes } from '@angular/router';

import { BlankLayout } from './shared/components/blank-layout/blank-layout';
import { AdminLayout } from './shared/components/admin-layout/admin-layout';
import { Dummy } from './shared/components/dummy/dummy';
import { NotFound } from './shared/components/not-found/not-found';
import { SignInForm } from './features/auth/sign-in-form/sign-in-form';

export const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full', title: 'Home' },
  {
    path: 'not-found',
    component: BlankLayout,
    children: [{ path: '', component: NotFound, title: 'Not Found' }],
  },
  {
    path: 'sign-in',
    component: BlankLayout,
    children: [{ path: '', component: SignInForm, title: 'Sign In' }],
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: Dummy, title: 'Dashboard' },
      { path: 'settings', component: Dummy, title: 'Settings' },
      { path: 'products', component: Dummy, title: 'Products' },
    ],
  },
  // { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
  {
    path: '**',
    component: BlankLayout,
    children: [{ path: '', component: NotFound, title: 'Not Found' }],
  },
];
