import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-benefits',
  standalone: true,
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sectionTitle') sectionTitle!: ElementRef;
  @ViewChild('benefitsGrid') benefitsGrid!: ElementRef;

  private observer: IntersectionObserver | null = null;

  constructor() {}

  ngOnInit() {
    // Initialize the intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add animation classes when element comes into view
            entry.target.classList.add('animate');
            // Unobserve after animation is triggered
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
  }

  ngAfterViewInit() {
    // Observe all elements with reveal animations
    const elementsToAnimate = document.querySelectorAll(
      '.reveal-title, .reveal-slide-up, .reveal-slide-right, .reveal-slide-left, .reveal-zoom'
    );

    elementsToAnimate.forEach(element => {
      this.observer?.observe(element);
    });
  }

  ngOnDestroy() {
    // Cleanup observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
