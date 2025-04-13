import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { CeoComponent } from '../../components/ceo/ceo.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';
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
    FooterComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-services></app-services>
    <app-benefits></app-benefits>
    <app-ceo></app-ceo>
    <app-logo-carousel></app-logo-carousel>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
