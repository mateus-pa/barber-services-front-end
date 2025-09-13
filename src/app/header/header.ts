import { NgClass, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private scroller: ViewportScroller) { }

  scrollToElement(fragment: string): void {
      this.scroller.scrollToAnchor(fragment);
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', [])
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    const stickyThreshold = 20; 

    if (scrollPosition >= stickyThreshold) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}
