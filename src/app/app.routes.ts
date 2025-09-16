import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./users/pages/user-list-page/user-list-page.component').then(
        (m) => m.UserListPageComponent
      ),
    title: 'User List',
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./users/pages/user-detail-page/user-detail-page.component').then(
        (m) => m.UserDetailPageComponent
      ),
    title: 'User Detail',
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
