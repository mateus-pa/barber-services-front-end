import { Routes } from '@angular/router';

import { App } from './app';
import { Funcoes } from './funcoes/funcoes';
import { Sobre } from './sobre/sobre';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
  {
    path: 'sobre',
    component: Sobre,
  },
  {
    path: 'funcoes',
    component: Funcoes,
  },
];

export class AppRoutingModule {}
