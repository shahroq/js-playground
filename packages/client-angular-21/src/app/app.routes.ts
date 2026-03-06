import { Routes } from '@angular/router';

import { NotFound } from './shared/components/not-found/not-found';
import { SignInForm } from './features/auth/sign-in-form/sign-in-form';
import { SignUpForm } from './features/auth/sign-up-form/sign-up-form';
import { AdminLayout } from './shared/components/admin-layout/admin-layout';
import { Dummy } from './shared/components/dummy/dummy';
import { App } from './app';
import { PhotoShow } from '@shared/components/photo-show/photo-show';

export const routes: Routes = [
  // { path: '', redirectTo: '/admin', pathMatch: 'full', title: 'Home' },
  { path: '', component: App },
  { path: 'photo-show', component: PhotoShow, title: 'Photo Show' },
  { path: 'not-found', component: NotFound, title: 'Not Found' },
  { path: 'sign-in', component: SignInForm, title: 'Sign In' },
  { path: 'sign-up', component: SignUpForm, title: 'Sign Up' },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: Dummy, title: 'Dashboard' },
      { path: 'settings', component: Dummy, title: 'Settings' },
      { path: 'products', component: Dummy, title: 'Products' },
      { path: 'test', component: Dummy, title: 'test' },
    ],
  },
  // { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
  { path: '**', component: NotFound, title: 'Not Found' },
];
