import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-webinar-registration',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800" id="register-form">Register For Webinar</h2>
      <div class="flex justify-center">
        <div class="wj-embed-wrapper" data-webinar-hash="8z69oap">
          <script src="https://event.webinarjam.com/register/8z69oap/embed-form?formButtonText=Register%20Now&formAccentColor=%2329b6f6&formAccentOpacity=0.95&formBgColor=%23ffffff&formBgOpacity=1"></script>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 400px;
    }
    .wj-embed-wrapper {
      width: 100%;
      min-height: 400px;
      max-width: 600px;
    }
  `]
})
export class WebinarRegistrationComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Ensure the script is loaded
    const script = document.createElement('script');
    script.src = 'https://event.webinarjam.com/register/8z69oap/embed-form?formButtonText=Register%20Now&formAccentColor=%2329b6f6&formAccentOpacity=0.95&formBgColor=%23ffffff&formBgOpacity=1';
    script.async = true;
    document.querySelector('.wj-embed-wrapper')?.appendChild(script);

    // Handle scroll to registration form
    const params = new URLSearchParams(window.location.search);
    if (params.get('register') === 'true') {
      const formElement = document.getElementById('register-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
} 