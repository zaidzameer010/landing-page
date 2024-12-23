import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

interface Testimonial {
  name: string;
  videoUrl: string;
  embedUrl?: SafeResourceUrl;
  videoId?: string;
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
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  videosPerPage = 4;

  testimonials: Testimonial[] = [
    {
      name: 'Ganesh Jadhav',
      videoUrl: 'https://www.youtube.com/watch?v=YBN0F8xjW9g',
      videoId: 'YBN0F8xjW9g'
    },
    {
      name: 'Chetan Vekhande',
      videoUrl: 'https://www.youtube.com/watch?v=zmjcNCT2JFc',
      videoId: 'zmjcNCT2JFc'
    },
    {
      name: 'Anuj Gogate',
      videoUrl: 'https://www.youtube.com/watch?v=7UrEd63Kow8',
      videoId: '7UrEd63Kow8'
    },
    {
      name: 'Abdullah Rangrez',
      videoUrl: 'https://www.youtube.com/watch?v=_zHyYaA7alU',
      videoId: '_zHyYaA7alU'
    },
    {
      name: 'Pavnesh Yadav',
      videoUrl: 'https://www.youtube.com/watch?v=dzhaXhyX07c',
      videoId: 'dzhaXhyX07c'
    },
    {
      name: 'Abdul Hafeez',
      videoUrl: 'https://www.youtube.com/watch?v=Bxxlg3uCSWM',
      videoId: 'Bxxlg3uCSWM'
    },
    {
      name: 'Sayyed Sarfaraz',
      videoUrl: 'https://www.youtube.com/watch?v=UiM4Vvpvnsk',
      videoId: 'UiM4Vvpvnsk'
    },
    {
      name: 'Jayesh Patil',
      videoUrl: 'https://www.youtube.com/watch?v=TNnvL4qfp44',
      videoId: 'TNnvL4qfp44'
    },
    {
      name: 'Mahendra Tadke',
      videoUrl: 'https://www.youtube.com/watch?v=NdwM6mTlNu4',
      videoId: 'NdwM6mTlNu4'
    },
    {
      name: 'Shivam Dalvi',
      videoUrl: 'https://www.youtube.com/watch?v=b3OggbKhT0s',
      videoId: 'b3OggbKhT0s'
    },
    {
      name: 'Zakir Shaikh',
      videoUrl: 'https://www.youtube.com/watch?v=TOKcl6eaAZs',
      videoId: 'TOKcl6eaAZs'
    },
    {
      name: 'Sultan Patel',
      videoUrl: 'https://www.youtube.com/watch?v=-I_fKezCYXE',
      videoId: '-I_fKezCYXE'
    },
    {
      name: 'Rishikesh Kamble',
      videoUrl: 'https://www.youtube.com/watch?v=vfw8BTrzhpk',
      videoId: 'vfw8BTrzhpk'
    },
    {
      name: 'Wasim Akram',
      videoUrl: 'https://www.youtube.com/watch?v=imJj8WsC2Yw',
      videoId: 'imJj8WsC2Yw'
    },
    {
      name: 'Shubham Gujar',
      videoUrl: 'https://www.youtube.com/watch?v=JcYbfcuBd2o',
      videoId: 'JcYbfcuBd2o'
    },
    {
      name: 'Sharmilee Shinde',
      videoUrl: 'https://www.youtube.com/watch?v=oMbq3e1Wj3Q',
      videoId: 'oMbq3e1Wj3Q'
    },
    {
      name: 'Jubeen Shaikh',
      videoUrl: 'https://www.youtube.com/watch?v=vaHAJudgjWk',
      videoId: 'vaHAJudgjWk'
    },
    {
      name: 'Anas Shaikh',
      videoUrl: 'https://www.youtube.com/watch?v=L6VhzS89u5Q',
      videoId: 'L6VhzS89u5Q'
    },
    {
      name: 'Krutika Patil',
      videoUrl: 'https://www.youtube.com/watch?v=Nfwe2kZpGCE',
      videoId: 'Nfwe2kZpGCE'
    },
    {
      name: 'Parvez Shaikh',
      videoUrl: 'https://www.youtube.com/watch?v=Ykb9cQbCJV0',
      videoId: 'Ykb9cQbCJV0'
    },
    {
      name: 'Ranjan Kumar',
      videoUrl: 'https://www.youtube.com/watch?v=cQ_qgdDNamQ',
      videoId: 'cQ_qgdDNamQ'
    },
    {
      name: 'Vishal Patil',
      videoUrl: 'https://www.youtube.com/watch?v=6cYylXR__yo',
      videoId: '6cYylXR__yo'
    }
  ];

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
    // Convert YouTube watch URLs to embed URLs and initialize video IDs
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

  ngOnInit() {
    // No initialization needed
  }

  ngOnDestroy() {
    // Clean up if needed
  }
} 