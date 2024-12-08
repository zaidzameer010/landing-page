import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      *ngIf="showScrollButton"
      (click)="scrollToTop()"
      class="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Scroll to top">
      <svg 
        class="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M5 10l7-7m0 0l7 7m-7-7v18">
        </path>
      </svg>
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }
    button {
      position: fixed;
    }
    @media (max-width: 640px) {
      button {
        bottom: 1rem !important;
        right: 1rem !important;
      }
    }
  `]
})
export class ScrollToTopComponent {
  showScrollButton = false;

  constructor(private smoothScrollService: SmoothScrollService) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 500;
  }

  scrollToTop() {
    this.smoothScrollService.scrollToTop();
  }
}
