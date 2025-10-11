import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Cadastrar } from './pages/cadastrar/cadastrar';
import { Dashboard } from './pages/dashboard/dashboard';
import { Expert } from './pages/expert/expert';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cadastro',
    component: Cadastrar,
  },
  {
    path: 'dashboard/home',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard/expert',
    component: Expert,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard/home',
    pathMatch: 'full',
  },
];
