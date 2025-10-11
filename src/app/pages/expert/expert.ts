import { Component } from '@angular/core';
import { ExpertDashboard } from '../../components/expert-dashboard/expert-dashboard';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { SidebarDashboard } from '../../components/sidebar-dashboard/sidebar-dashboard';

@Component({
  selector: 'app-expert',
  imports: [Header, SidebarDashboard, Footer, ExpertDashboard],
  templateUrl: './expert.html',
  styleUrl: './expert.css',
})
export class Expert {}
