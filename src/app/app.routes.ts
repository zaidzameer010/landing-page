import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { FaqComponent } from './components/faq/faq.component';

@Component({
  template: `
    <div class="w-full h-screen">
      <iframe 
        src="https://zohosecurepay.in/checkout/una5guwh-93am98fk7a9vc/Self-Paced-Program-One-Time--INR-35000"
        class="w-full h-full border-0"
        allow="payment"
        loading="eager"
      ></iframe>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class IframeComponent {}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'win',
    component: IframeComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
