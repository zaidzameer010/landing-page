import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitleComponent } from '../section-title/section-title.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChildren('dataPrep, dataAvailability, dataDisc') serviceCards!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  // Section title data
  sectionData = {
    badge: '3 Steps to Success',
    title: 'Comprehensive IT Training Solutions',
    subtitle: 'Master in-demand technologies with focused all-in-one training program'
  };

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

    this.initAnimations();
  }

  private initAnimations() {
    if (this.serviceCards) {
      // Animate each service card
      this.serviceCards.forEach((card, index) => {
        gsap.from(card.nativeElement, {
          scrollTrigger: {
            trigger: card.nativeElement,
            start: 'top 80%', // Start animation when the top of the card hits 80% of the viewport
            end: 'bottom 20%', // End animation when the bottom of the card hits 20% of the viewport
            toggleActions: 'play none none reverse', // Play on enter, pause on leave, none on leave-back, reverse on enter-back
            markers: false // Remove in production
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    }
  }

  ngOnDestroy() {
    // Clean up observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
