import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private scroller: ViewportScroller) { }

  scrollToElement(fragment: string): void {
      this.scroller.scrollToAnchor(fragment);
  }
}
