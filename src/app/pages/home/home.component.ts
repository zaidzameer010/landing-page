import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { CeoComponent } from '../../components/ceo/ceo.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';
// Remove the import for WebinarRegistrationComponent
import { FooterComponent } from '../../components/footer/footer.component';

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
    <!-- Remove the app-webinar-registration component from the template -->
    <app-footer></app-footer>
  `
})
export class HomeComponent {
  // Remove any methods related to the webinar registration component
}
