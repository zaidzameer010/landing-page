import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChildren('dataPrep, dataAvailability, dataDisc') serviceCards!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  constructor() {}

  ngOnInit() {
    // Initialize intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add reveal class when element comes into view
            entry.target.classList.add('reveal');
            // Stop observing after reveal
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  ngAfterViewInit() {
    // Start observing service cards
    this.serviceCards.forEach(card => {
      this.observer?.observe(card.nativeElement);
    });

    // Optional: Keep GSAP animations for desktop
    if (window.matchMedia('(hover: hover)').matches) {
      this.initHoverAnimations();
    }
  }

  private initHoverAnimations() {
    this.serviceCards.forEach(card => {
      const element = card.nativeElement;
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element.querySelector('svg'), {
          scale: 1.1,
          rotate: 5,
          duration: 0.3,
          ease: 'back.out(1.5)'
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element.querySelector('svg'), {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  ngOnDestroy() {
    // Clean up observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
