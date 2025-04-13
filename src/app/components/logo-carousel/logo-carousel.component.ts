import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Logo {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-logo-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-br from-blue-50/40 via-white to-blue-50/40 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 mb-6 section-title">Our Partners</h2>
        <div class="divider-container flex justify-center mb-10">
          <div class="w-24 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <!-- Static logo grid with center alignment -->
          <div class="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <div *ngFor="let logo of logos" class="logo-item flex items-center justify-center">
              <img 
                [src]="logo.src" 
                [alt]="logo.alt"
                class="max-h-24 max-w-full object-contain hover:scale-110 transition-transform duration-300 logo-glow"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .logo-item {
      width: 180px;
      height: 100px;
      position: relative;
      transition: all 0.3s ease;
    }
    .logo-item:hover {
      transform: translateY(-5px);
    }
    .logo-glow {
      filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
      transition: all 0.3s ease;
    }
    .logo-item:hover .logo-glow {
      filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.8));
    }
    .divider-container {
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
    @media (max-width: 640px) {
      .logo-item {
        width: 150px;
        height: 80px;
      }
    }
  `]
})
export class LogoCarouselComponent {
  logos: Logo[] = [
    { src: 'assets/logos/aws-partner.png', alt: 'AWS Partner' },
    { src: 'assets/logos/cloudera-partner.png', alt: 'Cloudera Partner' },
  ];
}
