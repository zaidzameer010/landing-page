import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService {
  constructor(private ngZone: NgZone) {
    // Force smooth scrolling behavior on the document
    this.enableSmoothScroll();
  }

  private enableSmoothScroll(): void {
    // Set smooth scroll behavior on the document
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';

    // Add smooth scrolling to all anchor links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            this.ngZone.run(() => {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              });
            });
          }
        }
      }
    });
  }

  scrollToElement(element: HTMLElement | string): void {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element)
      : element;

    if (targetElement) {
      this.ngZone.run(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      });
    }
  }

  scrollToTop(): void {
    this.ngZone.run(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  scrollToPosition(x: number, y: number): void {
    this.ngZone.run(() => {
      window.scrollTo({
        left: x,
        top: y,
        behavior: 'smooth'
      });
    });
  }
} 