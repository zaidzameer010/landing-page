import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div class="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center space-y-6 animate-fade-in">
        <div class="flex justify-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        
        <p class="text-xl text-gray-600 mb-6">
          Your purchase has been successfully completed.
        </p>
        
        <div class="bg-blue-50 rounded-xl p-6 text-center">
          <p class="text-gray-700 leading-relaxed">
            You will receive an Email and a WhatsApp message shortly with detailed instructions. 
            <span class="block mt-2 text-gray-600">
              Please also check your spam or junk email folder if needed.
            </span>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ThankYouComponent {} 