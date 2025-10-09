import { NgClass, ViewportScroller } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private scroller = inject(ViewportScroller);
  private router = inject(Router);

  isSticky: boolean = false;
  currentRoute: string = '';
  menuOpen: boolean = false;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
        this.checkScroll();
      });
  }

  scrollToElement(fragment: string): void {
    this.scroller.scrollToAnchor(fragment);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const stickyThreshold = 20;
    const alwaysStickyRoutes = ['/dashboard/home', '/perfil'];

    if (alwaysStickyRoutes.includes(this.currentRoute)) {
      this.isSticky = true;
      return;
    }

    this.isSticky = scrollPosition >= stickyThreshold;
  }
}
