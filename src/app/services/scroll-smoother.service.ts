import { Injectable, NgZone } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class ScrollSmootherService {
  private wrapper: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  private animation: gsap.core.Tween | null = null;
  private raf: number | null = null;
  private scrollTop = 0;
  private targetScrollTop = 0;
  private ease = 0.1;

  constructor(private ngZone: NgZone) {}

  init(): void {
    this.wrapper = document.getElementById('smooth-wrapper');
    this.content = document.getElementById('smooth-content');

    if (!this.wrapper || !this.content) {
      console.error('Smooth scroll elements not found');
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      // Set initial styles
      gsap.set(this.wrapper, {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden'
      });

      // Set body height to match content
      this.updateBodyHeight();
      window.addEventListener('resize', this.updateBodyHeight.bind(this));

      // Initialize scroll trigger refresh
      ScrollTrigger.refresh();

      // Start animation loop
      this.animate();

      // Add wheel event listener
      window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
      window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
      window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    });
  }

  private updateBodyHeight(): void {
    if (this.content) {
      const contentHeight = this.content.scrollHeight;
      document.body.style.height = `${contentHeight}px`;
    }
  }

  private animate(): void {
    this.scrollTop += (this.targetScrollTop - this.scrollTop) * this.ease;
    
    if (this.content) {
      gsap.set(this.content, {
        y: -this.scrollTop
      });

      ScrollTrigger.update();
    }

    this.raf = requestAnimationFrame(() => this.animate());
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const maxScroll = (this.content?.scrollHeight || 0) - window.innerHeight;
    this.targetScrollTop = Math.max(0, 
      Math.min(this.targetScrollTop + e.deltaY, maxScroll));
  }

  private touchY = 0;
  private lastY = 0;

  private onTouchStart(e: TouchEvent): void {
    this.touchY = e.touches[0].clientY;
    this.lastY = this.targetScrollTop;
  }

  private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    const delta = this.touchY - e.touches[0].clientY;
    const maxScroll = (this.content?.scrollHeight || 0) - window.innerHeight;
    this.targetScrollTop = Math.max(0, 
      Math.min(this.lastY + delta, maxScroll));
  }

  scrollTo(target: number | string | HTMLElement): void {
    let targetY = 0;

    if (typeof target === 'number') {
      targetY = target;
    } else if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        targetY = element.getBoundingClientRect().top + this.targetScrollTop;
      }
    } else {
      targetY = target.getBoundingClientRect().top + this.targetScrollTop;
    }

    const maxScroll = (this.content?.scrollHeight || 0) - window.innerHeight;
    this.targetScrollTop = Math.max(0, Math.min(targetY, maxScroll));
  }

  update(): void {
    this.updateBodyHeight();
    ScrollTrigger.refresh();
  }

  destroy(): void {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }

    window.removeEventListener('resize', this.updateBodyHeight.bind(this));
    window.removeEventListener('wheel', this.onWheel.bind(this));
    window.removeEventListener('touchmove', this.onTouchMove.bind(this));
    window.removeEventListener('touchstart', this.onTouchStart.bind(this));

    ScrollTrigger.refresh();
  }
} 