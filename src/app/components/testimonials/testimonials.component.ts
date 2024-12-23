import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Testimonial {
  videoUrl: string;
  embedUrl?: SafeResourceUrl;
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
                  <iframe 
                    [src]="testimonial.embedUrl" 
                    class="absolute inset-0 w-full h-full"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                  </iframe>
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
export class TestimonialsComponent {
  currentIndex = 0;
  videosPerPage = 4;

  testimonials: Testimonial[] = [
    {
      videoUrl: 'https://www.youtube.com/watch?v=YBN0F8xjW9g'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=zmjcNCT2JFc'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=7UrEd63Kow8'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=_zHyYaA7alU'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=dzhaXhyX07c'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=Bxxlg3uCSWM'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=UiM4Vvpvnsk'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=TNnvL4qfp44'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=NdwM6mTlNu4'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=b3OggbKhT0s'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=TOKcl6eaAZs'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=-I_fKezCYXE'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=vfw8BTrzhpk'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=imJj8WsC2Yw'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=JcYbfcuBd2o'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=oMbq3e1Wj3Q'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=vaHAJudgjWk'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=L6VhzS89u5Q'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=Nfwe2kZpGCE'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=Ykb9cQbCJV0'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=cQ_qgdDNamQ'
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=6cYylXR__yo'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {
    // Convert YouTube watch URLs to embed URLs
    this.testimonials = this.testimonials.map(testimonial => ({
      ...testimonial,
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
        testimonial.videoUrl.replace('watch?v=', 'embed/')
      )
    }));
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
} 