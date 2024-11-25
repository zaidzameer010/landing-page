import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { CeoComponent } from '../../components/ceo/ceo.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { PriceCalculatorComponent } from '../../components/price-calculator/price-calculator.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesComponent,
    CeoComponent,
    BenefitsComponent,
    FaqComponent,
    PriceCalculatorComponent,
    LogoCarouselComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-services></app-services>
    <app-benefits></app-benefits>
    <app-ceo></app-ceo>
    <app-price-calculator></app-price-calculator>
    <app-logo-carousel></app-logo-carousel>
    <app-faq></app-faq>
  `
})
export class HomeComponent {}
