import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ScrollSmootherService } from './services/scroll-smoother.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ScrollToTopComponent
  ],
  template: `
    <div [id]="useSmoothScroll ? 'smooth-wrapper' : ''" [class.standard-scroll]="!useSmoothScroll">
      <div [id]="useSmoothScroll ? 'smooth-content' : ''" [class.standard-content]="!useSmoothScroll">
        <main>
          <router-outlet></router-outlet>
          <app-scroll-to-top></app-scroll-to-top>
          <footer class="app-footer">
             <div class="footer-content">
               <div class="footer-item">
                 <div class="footer-icon-container">
                   <i class="fas fa-envelope footer-icon"></i>
                 </div>
                 <span class="footer-text">Nextlevel&#64;CloudAge.Ae</span>
               </div>
               <div class="footer-item">
                 <div class="footer-icon-container">
                   <i class="fab fa-whatsapp footer-icon"></i>
                 </div>
                 <span class="footer-text">971-585-786-989</span>
               </div>
               <div class="footer-item">
                 <div class="footer-icon-container">
                   <i class="fas fa-map-marker-alt footer-icon"></i>
                 </div>
                 <span>803, Shadow Tower, Al Mamzar, Sharjah, UAE</span>
               </div>
             </div>
             <div class="footer-bottom">
                &copy; {{ currentYear }} CloudAge. All Rights Reserved.
             </div>
          </footer>
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

    .app-footer {
      position: relative;
      padding: 40px 20px 30px;
      background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
      color: #1e293b;
      margin-top: 40px;
      overflow: hidden;
    }

    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto 30px;
      gap: 30px;
    }

    .footer-item {
      display: flex;
      align-items: center;
      gap: 15px;
      text-align: left;
      min-width: 250px;
      transition: transform 0.3s ease;
    }

    .footer-item:hover {
      transform: translateY(-5px);
    }

    .footer-icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #3b82f6, #60a5fa);
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
      transition: all 0.3s ease;
    }

    .footer-item:hover .footer-icon-container {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
    }

    .footer-icon {
      font-size: 1.3em;
      color: #ffffff;
    }

    .footer-item a, .footer-item span {
      color: #334155;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;
    }

    .footer-text {
      user-select: all;
      cursor: default;
    }

    .footer-item a:hover {
      color: #3b82f6;
    }

    .footer-bottom {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid rgba(59, 130, 246, 0.2);
      font-size: 0.9em;
      color: #64748b;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      
      .footer-item {
        text-align: center;
        justify-content: center;
        width: 100%;
        min-width: auto;
      }
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
