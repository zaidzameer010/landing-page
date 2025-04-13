import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSmootherService } from '../../services/scroll-smoother.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      *ngIf="showScrollButton"
      (click)="scrollToTop()"
      class="fixed bottom-8 right-8 z-[9999] p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
export class ScrollToTopComponent implements OnInit, OnDestroy {
  showScrollButton = false;
  private scrollThreshold = 500;
  private scrollSubscription: Subscription | null = null;
  private usingSmoothScroll = true;
  private routerSubscription: Subscription | null = null;
  private windowScrollListener: any = null;

  constructor(
    private scrollSmootherService: ScrollSmootherService,
    private router: Router
  ) {}

  ngOnInit() {
    // Set up router events to detect which pages we're on
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      this.usingSmoothScroll = !url.includes('/home') && !url.includes('/faq');
      this.setupScrollListener();
    });

    // Initial setup based on current URL
    const currentUrl = this.router.url;
    this.usingSmoothScroll = !currentUrl.includes('/home') && !currentUrl.includes('/faq');
    this.setupScrollListener();
  }

  private setupScrollListener() {
    // Clean up any existing listeners
    this.removeScrollListeners();

    if (this.usingSmoothScroll) {
      // Use the scroll smoother service for GSAP smooth scroll pages
      this.scrollSubscription = this.scrollSmootherService.scrollPosition$.subscribe(
        scrollPos => {
          this.showScrollButton = scrollPos > this.scrollThreshold;
        }
      );
    } else {
      // Use standard window scroll event for regular pages
      this.windowScrollListener = () => {
        this.showScrollButton = window.scrollY > this.scrollThreshold;
      };
      window.addEventListener('scroll', this.windowScrollListener);
      
      // Initial check
      this.showScrollButton = window.scrollY > this.scrollThreshold;
    }
  }

  private removeScrollListeners() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = null;
    }
    
    if (this.windowScrollListener) {
      window.removeEventListener('scroll', this.windowScrollListener);
      this.windowScrollListener = null;
    }
  }

  ngOnDestroy() {
    this.removeScrollListeners();
    
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }

  scrollToTop() {
    if (this.usingSmoothScroll) {
      this.scrollSmootherService.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
