import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Sobre } from './sobre/sobre';
import { Funcoes } from './funcoes/funcoes';

@Component({
  selector: 'app-root',
  imports: [TooltipModule, CommonModule, Header, Footer, Sobre, Funcoes],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('barberServices');
}
