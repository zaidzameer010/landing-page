import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ScrollSmootherService } from './services/scroll-smoother.service';
import { filter, Subscription } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ScrollToTopComponent,
    FooterComponent
  ],
  template: `
    <div [id]="useSmoothScroll ? 'smooth-wrapper' : ''" [class.standard-scroll]="!useSmoothScroll">
      <div [id]="useSmoothScroll ? 'smooth-content' : ''" [class.standard-content]="!useSmoothScroll">
        <main>
          <router-outlet></router-outlet>
          <app-scroll-to-top></app-scroll-to-top>
        </main>
      </div>
    </div>
  `,
  styles: [`
    #smooth-wrapper {
      overflow: hidden;
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    #smooth-content {
      min-height: 100vh;
    }
    
    .standard-scroll {
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
    }
    
    .standard-content {
      min-height: 100vh;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  useSmoothScroll = true;
  private routerSubscription: Subscription | null = null;
  currentYear: number;
  
  constructor(
    private scrollSmootherService: ScrollSmootherService,
    private router: Router
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Exclude home and faq pages from smooth scrolling
      const url = event.url;
      this.useSmoothScroll = !url.includes('/home') && !url.includes('/faq');
      
      if (this.useSmoothScroll) {
        // Only initialize smooth scrolling when needed
        document.body.classList.add('smooth-scroll-active');
        this.scrollSmootherService.init();
      } else {
        // Ensure smooth scrolling is destroyed when not needed
        document.body.classList.remove('smooth-scroll-active');
        this.scrollSmootherService.destroy();
        
        // Reset scroll position for normal scrolling
        window.scrollTo(0, 0);
      }
    });

    // Initial check based on starting URL
    const currentUrl = this.router.url;
    this.useSmoothScroll = !currentUrl.includes('/home') && !currentUrl.includes('/faq');
    
    if (this.useSmoothScroll) {
      document.body.classList.add('smooth-scroll-active');
      this.scrollSmootherService.init();
    } else {
      document.body.classList.remove('smooth-scroll-active');
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    this.scrollSmootherService.destroy();
  }
}
