import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { SidebarDashboard } from '../../components/sidebar-dashboard/sidebar-dashboard';
import { QueueDashboard } from '../../components/queue-dashboard/queue-dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Footer, SidebarDashboard, QueueDashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
