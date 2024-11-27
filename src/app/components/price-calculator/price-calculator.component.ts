import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

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
    id: '6',
    name: 'Technical Training Package',
    price: 1250,
    subItems: [
      { name: 'LinkedIn', price: 50 },
      { name: 'Resume', price: 50 },
      { name: 'Referrals', price: 50 },
      { name: "Directors' Advice", price: 100 },
      { name: 'Experience', price: 1000 }
    ]
  }
];

const POST_JOB_SUPPORT_ITEM: PricingItem = {
  id: '7',
  name: 'Post Job Support',
  price: 300
};

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PriceCalculatorComponent implements OnInit {
  selectedItems: Set<string> = new Set();
  mainPricingItems = PRICING_ITEMS;
  postJobSupportItem = POST_JOB_SUPPORT_ITEM;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeAnimations();
  }

  toggleItem(id: string) {
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
    } else {
      this.selectedItems.add(id);
    }
  }

  getTotalPrice(): number {
    let total = 0;
    for (const id of this.selectedItems) {
      const item = [...this.mainPricingItems, this.postJobSupportItem].find(i => i.id === id);
      if (item) {
        total += item.price;
      }
    }
    return total;
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

  scrollToCalculator() {
    const calculatorSection = document.querySelector('app-price-calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
