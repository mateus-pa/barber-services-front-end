import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [ TooltipModule, CommonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barberServices');
}
