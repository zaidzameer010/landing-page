import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
      <div class="inline-flex items-center justify-center p-1 mb-3 rounded-full bg-blue-50 backdrop-blur-sm border border-blue-100/50">
        <span class="px-3 py-1 text-[11px] sm:text-xs text-blue-700 font-semibold tracking-wider uppercase">
          {{badge}}
        </span>
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 tracking-tight mb-4">
        {{title}}
      </h2>
      <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
        {{subtitle}}
      </p>
    </div>
  `,
  styles: []
})
export class SectionTitleComponent {
  @Input() badge: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
} 