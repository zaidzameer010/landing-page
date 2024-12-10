import { Component, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { TimerService } from '../../services/timer.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription, catchError, of } from 'rxjs';

interface PricingItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  subItems?: { name: string; price: number; }[];
}

const PRICING_ITEMS: PricingItem[] = [
  {
    id: '1',
    name: 'Psychometric Assessment',
    price: 100,
    description: 'Current Mental Status'
  },
  {
    id: '2',
    name: 'Personality Improvement Package',
    price: 500,
    description: 'Communication, Leadership, negotiation Essentials'
  },
  {
    id: '3',
    name: 'Practical Training',
    price: 2500,
    description: 'Concepts & Market Value',
    subItems: [
      { name: 'Technology', price: 0 },
      { name: 'Management Quality', price: 0 }
    ]
  },
  {
    id: '4',
    name: 'Project Package',
    price: 1200,
    subItems: [
      { name: 'Mentorship', price: 300 },
      { name: 'Architecture approval', price: 300 },
      { name: 'Creating Portfolio', price: 300 },
      { name: 'Project Assignment', price: 300 }
    ]
  },
  {
    id: '5',
    name: 'Interview Practice Package',
    price: 150,
    description: 'App - apple and android',
    subItems: [
      { name: 'Corporate Delegate', price: 100 },
      { name: 'Real-Time Questions with scenarios', price: 50 }
    ]
  },
  {
    id: '7',
    name: 'Post Job Support',
    price: 300,
    description: 'Continuous support after securing your position'
  }
];

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class PriceCalculatorComponent implements OnInit, OnDestroy {
  mainPricingItems = PRICING_ITEMS;
  selectedSubItems: { [key: string]: boolean } = {};
  remainingTime: string = '15:00';
  private timerSubscription?: Subscription;
  private ipSubscription?: Subscription;
  private expiredSubscription?: Subscription;
  isTimerExpired: boolean = false;
  currentIp: string = '';
  isInitialized: boolean = false;

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    private timerService: TimerService
  ) {}

  ngOnInit() {
    this.initializeAnimations();
    this.initializeTimer();
  }

  ngOnDestroy() {
    this.cleanupSubscriptions();
  }

  private cleanupSubscriptions() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.ipSubscription) {
      this.ipSubscription.unsubscribe();
    }
    if (this.expiredSubscription) {
      this.expiredSubscription.unsubscribe();
    }
  }

  private initializeTimer() {
    if (this.isInitialized) return;

    this.ipSubscription = this.timerService.getIPAddress()
      .pipe(
        catchError(error => {
          console.error('Error fetching IP address:', error);
          return of('local-' + Date.now());
        })
      )
      .subscribe(ip => {
        this.currentIp = ip;
        this.isInitialized = true;
        this.timerService.initializeTimer(ip);
        this.setupTimerSubscriptions();
      });
  }

  private setupTimerSubscriptions() {
    this.timerSubscription = this.timerService.getTimer().subscribe(time => {
      this.remainingTime = this.timerService.formatTime(time);
    });

    this.expiredSubscription = this.timerService.getIsExpired().subscribe(isExpired => {
      this.isTimerExpired = isExpired;
    });
  }

  resetTimer() {
    if (this.isTimerExpired && this.currentIp) {
      this.timerService.resetTimer(this.currentIp);
    }
  }

  getTotalPrice(): number {
    return this.mainPricingItems.reduce((total, item) => {
      let itemTotal = item.price;
      if (item.subItems) {
        // For now, we'll consider only the base prices since sub-items appear to be included
        // in the main item price or are optional add-ons that need user selection
        // itemTotal += item.subItems.reduce((subTotal, subItem) => subTotal + subItem.price, 0);
      }
      return total + itemTotal;
    }, 0);
  }

  initializeAnimations() {
    gsap.from('.pricing-card', {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
}
