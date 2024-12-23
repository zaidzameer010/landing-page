import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ScrollSmootherService } from './services/scroll-smoother.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ScrollToTopComponent
  ],
  template: `
    <div id="smooth-wrapper">
      <div id="smooth-content">
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
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private scrollSmootherService: ScrollSmootherService) {}

  ngOnInit() {
    this.scrollSmootherService.init();
  }

  ngOnDestroy() {
    this.scrollSmootherService.destroy();
  }
}
