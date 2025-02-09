import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  expandedIndex: number = -1;

  // FAQ Categories with sequential indices
  programOverview = [0, 1, 2, 3, 4, 5, 6];
  learningExperience = [7, 8, 9, 10, 11, 12];
  careerOutcomes = [13, 14, 15, 16, 17, 18, 19];
  programFeatures = [20, 21, 22, 23, 24, 25];
  admissionsFees = [26, 27, 28, 29, 30];

  toggleFaq(categoryIndex: number, index: number) {
    const absoluteIndex = categoryIndex * 100 + index;
    this.expandedIndex = this.expandedIndex === absoluteIndex ? -1 : absoluteIndex;
  }

  isExpanded(categoryIndex: number, index: number): boolean {
    return this.expandedIndex === (categoryIndex * 100 + index);
  }

  getFaqTitle(index: number): string {
    const titles = [
      // Program Overview [0-6]
      'Can you teach me from the basics, even if I\'m from a non-IT background?',
      'How long does the course take to complete?',
      'What\'s the name of the course?',
      'Does the curriculum include cutting-edge Technologies?',
      'How is this possible without coding?',
      'I\'m from a non-IT field. Can I really do this program?',
      'Does the IT industry value fresh talent?',

      // Learning Experience [7-12]
      'Can I complete this course while working a full-time job?',
      'Are online and offline sessions delivered by the same expert trainers?',
      'Will I have access to recorded sessions?',
      'Will I get help during the project completion stage?',
      'What happens after completing the program?',
      'How should I prepare for the program?',

      // Career Outcomes [13-19]
      'Does this course guarantee me a job?',
      'How many interview calls will I get for placements?',
      'What industries can I work in after this program?',
      'Can I apply for international job opportunities?',
      'What kind of career growth can I expect?',
      'I\'m a fresh graduate—how do I justify my experience?',
      'What job roles will this course prepare me for?',

      // Program Features [20-25]
      'Do I need prior programming experience to excel in this course?',
      'What are the most in-demand tech skills today?',
      'Are trial or demo sessions available?',
      'Can I interact with alumni who successfully completed this programme?',
      'Can I enrol for only the AI specialisation or shorter modules?',
      'How will this course help me transition into an IT career?',

      // Admissions & Fees [26-30]
      'What is the fee structure and certification costs?',
      'What is the enrolment process?',
      'Is 6 months enough for this program?',
      'Is there a discount for referring others?',
      'Can I get the recording of the webinar?'
    ];
    return titles[index] || '';
  }
} 