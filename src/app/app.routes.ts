import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' }
];

export const appRoutingProviders = [
  provideRouter(routes)
];