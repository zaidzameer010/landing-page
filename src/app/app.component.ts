import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { SmoothScrollService } from './services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ScrollToTopComponent
  ],
  template: `
    <main>
      <router-outlet></router-outlet>
      <app-scroll-to-top></app-scroll-to-top>
    </main>
  `
})
export class AppComponent {
  constructor(private smoothScrollService: SmoothScrollService) {}
}
