import { Routes } from '@angular/router';
<<<<<<< HEAD
=======
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
>>>>>>> 92b97ac1635f9ef84d8eb42a0314eb4389366c90

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
<<<<<<< HEAD
=======
    path: 'win',
    component: IframeComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./pages/thankyou/thankyou.routes').then(m => m.THANKYOU_ROUTES)
  },
  {
>>>>>>> 92b97ac1635f9ef84d8eb42a0314eb4389366c90
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
