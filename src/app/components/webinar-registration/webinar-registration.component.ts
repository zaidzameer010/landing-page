import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-webinar-registration',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="webinar-section" class="bg-gradient-to-br from-blue-50/80 via-white to-blue-50/80 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-6 section-title">
          <div class="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a href="https://event.webinarjam.com/register/8z69oap" 
               target="_blank" 
               rel="noopener noreferrer"
               class="bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300 animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent hover:opacity-80 transition-colors">
              Register for Our Webinar
            </a>
          </div>
        </h2>
        <div class="divider-container flex justify-center mb-10">
          <div class="w-24 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="wj-embed-wrapper" data-webinar-hash="8z69oap">
            <script src="https://event.webinarjam.com/register/8z69oap/embed-form?formButtonText=Register%20Now&formAccentColor=%2329b6f6&formAccentOpacity=0.95&formBgColor=%23ffffff&formBgOpacity=1"></script>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    .divider-container {
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
    .section-title {
      position: relative;
    }
    @keyframes gradient {
      0% { background-position: 0% center; }
      50% { background-position: -100% center; }
      100% { background-position: -200% center; }
    }
    .animate-gradient {
      animation: gradient 2s linear infinite;
      background-size: 200% auto;
    }
  `]
})
export class WebinarRegistrationComponent {} 