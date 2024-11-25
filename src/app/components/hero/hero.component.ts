import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  private timeline: gsap.core.Timeline = gsap.timeline();
  private parallaxElements: ScrollTrigger[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initAnimations();
    this.initParallax();
  }

  ngOnDestroy() {
    // Clean up animations
    if (this.timeline) {
      this.timeline.kill();
    }
    this.parallaxElements.forEach(trigger => trigger.kill());
  }

  private initAnimations() {
    const element = this.el.nativeElement;
    
    // Reset timeline
    this.timeline = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });

    // Fade in logo with bounce
    this.timeline.from('.logo-container', {
      y: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)'
    });

    // Stagger text animations with subtle split effect
    const textElements = element.querySelectorAll('.animate-text');
    textElements.forEach((el: Element, index: number) => {
      const text = el.textContent || '';
      el.textContent = '';
      
      // Split text into spans
      const chars = text.split('').map(char => `<span class="inline-block">${char}</span>`).join('');
      el.innerHTML = chars;
      
      // Animate each character
      this.timeline.from(el.querySelectorAll('span'), {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        delay: 0.3 * (index + 1)
      }, '>-0.5');
    });

    // Button animations with bounce
    this.timeline.from('.btn-animate', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 1,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)'
    }, '>-0.2');
  }

  private initParallax() {
    const element = this.el.nativeElement;

    // Parallax effect for background elements
    const bgElements = element.querySelectorAll('.parallax-bg');
    bgElements.forEach((el: Element, index: number) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const yPos = self.progress * 100 * (index + 1) * (index % 2 ? 1 : -1);
          gsap.to(el, {
            y: yPos,
            rotation: yPos / 10,
            duration: 0.5,
            ease: 'none'
          });
        }
      });
      this.parallaxElements.push(trigger);
    });

    // Subtle parallax for content elements
    const contentElements = element.querySelectorAll('.parallax-element');
    contentElements.forEach((el: Element, index: number) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const yPos = self.progress * 30 * (index % 2 ? 1 : -1);
          gsap.to(el, {
            y: yPos,
            duration: 0.5,
            ease: 'none'
          });
        }
      });
      this.parallaxElements.push(trigger);
    });
  }
}
