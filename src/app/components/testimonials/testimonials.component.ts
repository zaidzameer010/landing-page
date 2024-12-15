import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  videoUrl: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/80">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 tracking-tight mb-4">
            Student Testimonials
          </h2>
          <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear directly from our successful students about their journey and transformation
          </p>
        </div>

        <!-- Video Container -->
        <div class="relative max-w-7xl mx-auto">
          <!-- Videos -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div *ngFor="let testimonial of visibleTestimonials" 
                 class="w-full">
              <div class="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]">
                <div class="relative pt-[56.25%]">
                  <video 
                    [src]="testimonial.videoUrl" 
                    class="absolute inset-0 w-full h-full object-cover"
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    (fullscreenchange)="handleFullscreenChange($event)"
                    (webkitfullscreenchange)="handleFullscreenChange($event)"
                    (mozfullscreenchange)="handleFullscreenChange($event)"
                    (MSFullscreenChange)="handleFullscreenChange($event)">
                  </video>
                </div>
                <div class="px-4 py-3 border-t border-gray-100">
                  <h3 class="text-base font-medium text-gray-800">{{ testimonial.name }}</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-center mt-8 gap-4 md:absolute md:-right-12 md:top-1/2 md:-translate-y-1/2 md:flex-col">
            <button 
              (click)="showPreviousVideos()"
              class="p-3 rounded-full bg-white border border-gray-100 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 text-gray-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </button>
            <button 
              (click)="showNextVideos()"
              class="p-3 rounded-full bg-white border border-gray-100 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  videosPerPage = 4;
  private scrollPosition = 0;

  testimonials: Testimonial[] = [
    {
      name: 'Anas',
      videoUrl: 'assets/Testimonials/1_Anas-Testimonial-2023.mp4'
    },
    {
      name: 'Krutika',
      videoUrl: 'assets/Testimonials/2_Krutika-Testimonial-2023.mp4'
    },
    {
      name: 'Parvez',
      videoUrl: 'assets/Testimonials/3_Parvez-Testimonial-2023.mp4'
    },
    {
      name: 'Ranjan',
      videoUrl: 'assets/Testimonials/4_Ranjan-Testimonial-2023.mp4'
    },
    {
      name: 'Vishal',
      videoUrl: 'assets/Testimonials/5_Vishal-Testimonial-2023.mp4'
    },
    {
      name: 'Anuj Gogate',
      videoUrl: 'assets/Testimonials/Anuj-Gogate-Testimonial-6.mp4'
    },
    {
      name: 'Pavnesh Yadav',
      videoUrl: 'assets/Testimonials/Pavnesh-Yadav-Testimonial-7.mp4'
    },
    {
      name: 'Abdul Hafeez',
      videoUrl: 'assets/Testimonials/Abdul-Hafeez-Testimonial-8.mp4'
    },
    {
      name: 'Sayyed Sarfaraz',
      videoUrl: 'assets/Testimonials/Sayyed-Sarfaraz-Testimonial-9.mp4'
    },
    {
      name: 'Ganesh Jadhav',
      videoUrl: 'assets/Testimonials/Ganesh-Jadhav-Testimonial-10.mp4'
    },
    {
      name: 'Jayesh Patil',
      videoUrl: 'assets/Testimonials/Jayesh-Patil-Testimonial-11.mp4'
    },
    {
      name: 'Mahendra Tadke',
      videoUrl: 'assets/Testimonials/Mahendra-Tadke-Testimonial-12.mp4'
    },
    {
      name: 'Shivam Dalvi',
      videoUrl: 'assets/Testimonials/Shivam-Dalvi-Testimonial-13.mp4'
    },
    {
      name: 'Abdullah Rangrez',
      videoUrl: 'assets/Testimonials/Abdullah-Rangrez-Testimonial-14.mp4'
    },
    {
      name: 'Zakir',
      videoUrl: 'assets/Testimonials/Zakir-Testimonial-15.mp4'
    },
    {
      name: 'Sultan Patel',
      videoUrl: 'assets/Testimonials/Sultan-Patel-Testimonial-17.mp4'
    },
    {
      name: 'Rishikesh Kamble',
      videoUrl: 'assets/Testimonials/Rishikesh-Kamble-Testimonial-18.mp4'
    },
    {
      name: 'Chetan Vekhande',
      videoUrl: 'assets/Testimonials/Chetan-Vekhande-Testimonial-19.mp4'
    },
    {
      name: 'Wasim Akram',
      videoUrl: 'assets/Testimonials/Wasim-Akram-Testimonial-1-.mp4'
    },
    {
      name: 'Shubham Gujar',
      videoUrl: 'assets/Testimonials/Shubham-Gujar-Testimonial-2.mp4'
    },
    {
      name: 'Sharmilee Shinde',
      videoUrl: 'assets/Testimonials/Sharmilee-Shinde-Testimonial-3.mp4'
    },
    {
      name: 'Jubeen Shaikh',
      videoUrl: 'assets/Testimonials/Jubeen-Shaikh-Testimonial-4.mp4'
    }
  ];

  handleFullscreenChange(event: Event) {
    const isFullscreen = document.fullscreenElement || 
                        (document as any).webkitFullscreenElement || 
                        (document as any).mozFullScreenElement || 
                        (document as any).msFullscreenElement;
    
    if (!isFullscreen) {
      // When exiting fullscreen, restore the scroll position after a short delay
      setTimeout(() => {
        window.scrollTo({
          top: this.scrollPosition,
          behavior: 'instant'
        });
      }, 100);
    } else {
      // Store the current scroll position when entering fullscreen
      this.scrollPosition = window.scrollY;
    }
  }

  get visibleTestimonials(): Testimonial[] {
    const startIndex = this.currentIndex;
    const endIndex = startIndex + this.videosPerPage;
    return this.testimonials.slice(startIndex, endIndex);
  }

  showNextVideos() {
    const nextIndex = this.currentIndex + this.videosPerPage;
    if (nextIndex < this.testimonials.length) {
      this.currentIndex = nextIndex;
    } else {
      this.currentIndex = 0;
    }
  }

  showPreviousVideos() {
    const prevIndex = this.currentIndex - this.videosPerPage;
    if (prevIndex >= 0) {
      this.currentIndex = prevIndex;
    } else {
      const lastSetIndex = Math.floor((this.testimonials.length - 1) / this.videosPerPage) * this.videosPerPage;
      this.currentIndex = lastSetIndex;
    }
  }

  ngOnInit() {
    // No initialization needed
  }

  ngOnDestroy() {
    // Clean up if needed
  }
} 