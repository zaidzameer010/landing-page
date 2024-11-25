import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

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
        <h2 class="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 mb-8">Our Partners</h2>
        
        <div class="relative max-w-5xl mx-auto overflow-hidden">
          <!-- Logo track -->
          <div class="flex logo-track" #logoTrack>
            <div *ngFor="let logo of displayLogos" class="logo-slide flex-shrink-0 px-8">
              <div class="flex items-center justify-center h-32">
                <img 
                  [src]="logo.src" 
                  [alt]="logo.alt"
                  class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                >
              </div>
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
    .logo-track {
      display: flex;
      gap: 2rem;
      width: fit-content;
    }
    .logo-slide {
      width: 250px;
    }
    @media (max-width: 640px) {
      .logo-slide {
        width: 180px;
      }
    }
  `]
})
export class LogoCarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('logoTrack') logoTrack!: ElementRef;

  logos: Logo[] = [
    { src: 'assets/logos/aws-partner.png', alt: 'AWS Partner' },
    { src: 'assets/logos/google-cloud-partner.png', alt: 'Google Cloud Partner' },
    { src: 'assets/logos/Oracle-Partner-Logo.png', alt: 'Oracle Partner' },
    { src: 'assets/logos/cloudera-partner.png', alt: 'Cloudera Partner' },
    { src: 'assets/logos/nasscom.png', alt: 'NASSCOM' },
    { src: 'assets/logos/start-up-india.png', alt: 'Start-up India' }
  ];

  // Triple the logos for smoother infinite scroll
  displayLogos: Logo[] = [];

  constructor(private ngZone: NgZone) {
    // Triple the logos array for smoother looping
    this.displayLogos = [...this.logos, ...this.logos, ...this.logos];
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initAnimation();
  }

  private initAnimation() {
    const track = this.logoTrack.nativeElement;
    const totalWidth = track.offsetWidth / 3; // One-third because we tripled the logos

    // Create infinite scrolling animation
    this.ngZone.runOutsideAngular(() => {
      gsap.to(track, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(track, { x: 0 });
        }
      });

      // Pause on hover
      track.addEventListener('mouseenter', () => {
        gsap.to(track, { timeScale: 0, duration: 0.5 });
      });

      track.addEventListener('mouseleave', () => {
        gsap.to(track, { timeScale: 1, duration: 0.5 });
      });
    });
  }
}
