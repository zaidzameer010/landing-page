import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface PricingItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  subItems?: { name: string; price: number; }[];
}

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PriceCalculatorComponent implements OnInit {
  selectedItems: Set<number> = new Set();
  totalPrice: number = 0;

  postJobSupportItem: PricingItem = {
    id: 7,
    name: 'Post Job Support',
    price: 300
  };

  mainPricingItems: PricingItem[] = [
    {
      id: 1,
      name: 'Psychometric Assessment',
      price: 100,
      description: 'Current Mental Status'
    },
    {
      id: 2,
      name: 'Personality Improvement Package',
      price: 500,
      description: 'Communication, Leadership, negotiation Essentials'
    },
    {
      id: 3,
      name: 'Practical Training',
      price: 2500,
      description: 'Concepts & Market Value',
      subItems: [
        { name: 'Technology', price: 0 },
        { name: 'Management Quality', price: 0 }
      ]
    },
    {
      id: 4,
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
      id: 5,
      name: 'Interview Practice Package',
      price: 150,
      description: 'App - apple and android',
      subItems: [
        { name: 'Corporate Delegate', price: 100 },
        { name: 'Real-Time Questions with scenarios', price: 50 }
      ]
    },
    {
      id: 6,
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

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeAnimations();
    this.initializeParticleEffects();
  }

  onMouseMove(event: MouseEvent, card: HTMLElement) {
    const cards = this.elementRef.nativeElement.querySelectorAll('.pricing-card');
    cards.forEach((otherCard: HTMLElement) => {
      if (otherCard !== card) {
        this.renderer.setStyle(otherCard, 'filter', 'blur(1px) brightness(0.98)');
        this.renderer.setStyle(otherCard, 'transform', 'scale(0.99)');
      }
    });
    
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    requestAnimationFrame(() => {
      this.renderer.setStyle(card, '--x', `${x}px`);
      this.renderer.setStyle(card, '--y', `${y}px`);
    });
  }

  onMouseLeave(card: HTMLElement) {
    const cards = this.elementRef.nativeElement.querySelectorAll('.pricing-card');
    cards.forEach((otherCard: HTMLElement) => {
      this.renderer.removeStyle(otherCard, 'filter');
      this.renderer.removeStyle(otherCard, 'transform');
    });
    
    requestAnimationFrame(() => {
      this.renderer.setStyle(card, '--x', '50%');
      this.renderer.setStyle(card, '--y', '50%');
    });
  }

  toggleItem(itemId: number) {
    if (this.selectedItems.has(itemId)) {
      this.selectedItems.delete(itemId);
    } else {
      this.selectedItems.add(itemId);
    }
    this.calculateTotal();
    this.animatePrice();
  }

  calculateTotal() {
    this.totalPrice = Array.from(this.selectedItems).reduce((sum, itemId) => {
      const item = [...this.mainPricingItems, this.postJobSupportItem].find(i => i.id === itemId);
      return sum + (item?.price || 0);
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

  animatePrice() {
    gsap.to('.total-price', {
      duration: 0.5,
      scale: 1.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  }

  initializeParticleEffects() {
    const cards = this.elementRef.nativeElement.querySelectorAll('.pricing-card');
    cards.forEach((card: HTMLElement) => {
      for (let i = 0; i < 5; i++) {
        const particle = this.renderer.createElement('div');
        this.renderer.addClass(particle, 'particle');
        this.renderer.setStyle(particle, 'animation-duration', `${Math.random() * 2 + 1}s`);
        this.renderer.setStyle(particle, 'animation-delay', `${Math.random() * 2}s`);
        this.renderer.appendChild(card, particle);
      }
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
