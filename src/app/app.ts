import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Banner } from './banner/banner';
import { Footer } from './footer/footer';
import { Funcoes } from './funcoes/funcoes';
import { Header } from './header/header';
import { Sobre } from './sobre/sobre';

@Component({
  selector: 'app-root',
  imports: [TooltipModule, CommonModule, Header, Footer, Sobre, Funcoes, RouterOutlet, Banner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('barberServices');
}
