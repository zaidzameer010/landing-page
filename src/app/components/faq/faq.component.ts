import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, AfterViewInit {
  @ViewChild('sectionTitle') sectionTitle!: ElementRef;
  @ViewChild('faqContainer') faqContainer!: ElementRef;

  faqs: FaqItem[] = [
    {
      id: 1,
      question: 'I am a fresher from computer Science Background, Can I do this course?',
      answer: 'I can is More important than IQ & EQ, this is purely computer science domain.',
      isOpen: false
    },
    {
      id: 2,
      question: 'I have 5 + or 10+ years of experience Non-IT (Information Technology) Field, Can I do this course?',
      answer: 'Human Being can remember only last six months of work experience, if you work hard, smart, and do the just work exactly the way we ask you to do then YES.',
      isOpen: false
    },
    {
      id: 3,
      question: 'Is it mandatory to pass in the psychometric test, in order to get admission to the course?',
      answer: 'Pass & Fail are concepts of old school, in Real Life either you Learn or Earn & have Fun. Welcome to Twenty First Century.',
      isOpen: false
    },
    {
      id: 4,
      question: 'Can I do this course while, I am still in college , 1st / 2nd /3rd or 4th year, will I get a job post completing the college?',
      answer: 'Yes.',
      isOpen: false
    },
    {
      id: 5,
      question: 'Project building will be done in a group or we need to present the project individually?',
      answer: 'While working in IT you will work Solo, while creating a project individually is Better however you get full support in the Team.',
      isOpen: false
    },
    {
      id: 6,
      question: 'Can I quit my current low paying job, to do the course?',
      answer: 'Full Focus Full Success, No Focus No Success. That depends on your roles and responsibilities at home, You will reduce the time to the path of success that is guaranteed.',
      isOpen: false
    },
    {
      id: 7,
      question: 'Can I do this course while doing a full time job, and achieve success?',
      answer: 'It will take atleast 1 year in that case, However the answer is Yes.',
      isOpen: false
    },
    {
      id: 8,
      question: 'I do not know programming or coding, can I still do AiOps & Multi-Cloud Engineering course?',
      answer: 'It will take atleast 1 year in that case, However the answer is Yes.',
      isOpen: false
    },
    {
      id: 9,
      question: 'Is there any additional / Extra Charge for attending the labs or is it included in the course fees?',
      answer: 'Labs are Community Support & Free, However You pay for the course only.',
      isOpen: false
    },
    {
      id: 10,
      question: 'I live in a remote location, how can I attend the labs?',
      answer: 'Online, ( Welcome to Twenty First Century)',
      isOpen: false
    },
    {
      id: 11,
      question: 'Who conduct the lab sessions for hands on practice?',
      answer: 'Labs are conducted by volunteers.',
      isOpen: false
    },
    {
      id: 12,
      question: 'Can I attend the course using a mobile phone?',
      answer: 'If you have super powers then Yes, if you are Being Human Not at all.',
      isOpen: false
    },
    {
      id: 13,
      question: 'What is the timing for the batch?',
      answer: 'Majority of the Batchmates will decide with voting the suitable time.',
      isOpen: false
    },
    {
      id: 14,
      question: 'What is the minimum requirement / Criteria to join AiOps & Multi-Cloud Engineering course?',
      answer: 'HSC, Understanding English, Money to Pay the Fees, and Zeal to Excel in life are some of the minimum criterias to join and succeed.',
      isOpen: false
    }
  ];

  displayedFaqs: FaqItem[] = [];
  itemsPerPage = 5;
  currentPage = 1;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
    this.loadMoreFaqs();
  }

  loadMoreFaqs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const newFaqs = this.faqs.slice(startIndex, endIndex);
    this.displayedFaqs = [...this.displayedFaqs, ...newFaqs];
    this.currentPage++;
  }

  hasMoreFaqs(): boolean {
    return this.displayedFaqs.length < this.faqs.length;
  }

  ngAfterViewInit() {
    // Simplified title animation
    gsap.from(this.sectionTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.sectionTitle.nativeElement,
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Simplified FAQ items animation - just a subtle fade
    const faqItems = this.faqContainer.nativeElement.querySelectorAll('.faq-item');
    faqItems.forEach((item: Element) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out'
      });
    });
  }

  toggleFaq(selectedFaq: FaqItem) {
    // Close all other FAQs
    this.faqs.forEach(faq => {
      if (faq.id !== selectedFaq.id) {
        faq.isOpen = false;
      }
    });

    // Toggle selected FAQ
    selectedFaq.isOpen = !selectedFaq.isOpen;
  }
}
