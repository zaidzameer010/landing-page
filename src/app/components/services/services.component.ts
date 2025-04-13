import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SectionTitleComponent } from '../section-title/section-title.component';

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
      // Animate each service card with simple animations
      this.serviceCards.forEach((card, index) => {
        gsap.from(card.nativeElement, {
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
