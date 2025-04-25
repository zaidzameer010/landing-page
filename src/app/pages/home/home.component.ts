import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { CeoComponent } from '../../components/ceo/ceo.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';
// Remove the import for WebinarRegistrationComponent
import { FooterComponent } from '../../components/footer/footer.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesComponent,
    CeoComponent,
    BenefitsComponent,
    LogoCarouselComponent,
    // Remove WebinarRegistrationComponent from imports
    FooterComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-services></app-services>
    <app-ceo></app-ceo>
    <app-benefits></app-benefits>
    <app-logo-carousel></app-logo-carousel>
    <div class="bg-gradient-to-b from-blue-50/30 to-indigo-50/20 py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 tracking-tight mb-6">
            Join The IT Elite
          </h2>
          <p class="text-gray-700 text-center text-lg mb-8 max-w-3xl mx-auto">
            Take the first step towards becoming part of the top 1% in the IT industry. Complete the form below to begin your journey.
          </p>
          <div class="bg-white rounded-2xl shadow-xl p-2 sm:p-6 border border-blue-100 transform transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
            <iframe 
              aria-label='Be The Top 1% In IT Industry' 
              frameborder="0" 
              style="height:500px;width:100%;border:none;border-radius:0.75rem;overflow:hidden;" 
              [src]="formUrl"
              class="shadow-inner"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class HomeComponent {
  formUrl: SafeResourceUrl;
  
  constructor(private sanitizer: DomSanitizer) {
    this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://forms.zohopublic.in/cloudageglobal/form/BeTheTop1InITIndustry/formperma/At-J7RHhwvdyGbRp31ZmpD6J6GtaWf5ytEe8rX1k8mE'
    );
  }
}
