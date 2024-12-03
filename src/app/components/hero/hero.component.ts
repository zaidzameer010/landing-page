import { Component, OnInit, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
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
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroVideo') private videoElement!: ElementRef<HTMLVideoElement>;
  private timeline: gsap.core.Timeline;
  private parallaxElements: ScrollTrigger[] = [];
  private videoEventListeners: { event: string; listener: EventListener }[] = [];

  constructor(private el: ElementRef) {
    this.timeline = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });
  }

  ngOnInit(): void {
    this.initAnimations();
    this.initParallax();
  }

  ngAfterViewInit(): void {
    this.initVideo();
  }

  ngOnDestroy(): void {
    // Clean up animations
    if (this.timeline) {
      this.timeline.kill();
    }
    
    // Clean up scroll triggers
    this.parallaxElements.forEach(trigger => trigger.kill());
    
    // Clean up video event listeners
    if (this.videoElement?.nativeElement) {
      this.videoEventListeners.forEach(({ event, listener }) => {
        this.videoElement.nativeElement.removeEventListener(event, listener);
      });
    }
  }

  private initAnimations(): void {
    const element = this.el.nativeElement;
    
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
      const chars = text.split('').map(char => 
        `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
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

  private initParallax(): void {
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

  private initVideo(): void {
    if (!this.videoElement?.nativeElement) {
      console.error('Video element not found');
      return;
    }

    const video = this.videoElement.nativeElement;
    
    // Ensure video is muted (some browsers require this for autoplay)
    video.muted = true;
    
    const setPlaybackRate = () => {
      if (video) {
        video.playbackRate = 0.8;
      }
    };

    const handlePlayback = () => {
      if (!video) return;

      // Ensure video is loaded
      if (video.readyState >= 2) {
        setPlaybackRate();
        video.play()
          .then(() => {
            console.log('Video playing successfully');
            setPlaybackRate(); // Set again after successful play
          })
          .catch((error: Error) => {
            console.error('Video playback failed:', error);
            // Retry with a fallback approach
            video.muted = true; // Ensure muted as fallback
            video.play()
              .then(() => {
                console.log('Video playing after fallback');
                setPlaybackRate();
              })
              .catch((retryError: Error) => {
                console.error('Video playback failed after retry:', retryError);
              });
          });
      } else {
        // Wait for more data if not enough is loaded
        video.addEventListener('canplay', handlePlayback, { once: true });
      }
    };

    // Add event listeners
    const loadedMetadataListener = () => {
      console.log('Video metadata loaded');
      handlePlayback();
    };
    
    const rateChangeListener = () => {
      if (video && video.playbackRate !== 0.8) {
        setPlaybackRate();
      }
    };

    const errorListener = (e: Event) => {
      console.error('Video error:', (e as ErrorEvent).error);
    };

    // Store listeners for cleanup
    this.videoEventListeners = [
      { event: 'loadedmetadata', listener: loadedMetadataListener },
      { event: 'ratechange', listener: rateChangeListener },
      { event: 'error', listener: errorListener }
    ];

    // Add listeners to video element
    this.videoEventListeners.forEach(({ event, listener }) => {
      video.addEventListener(event, listener);
    });

    // Start loading the video
    video.load();
    
    // Try initial playback
    handlePlayback();
  }
}
