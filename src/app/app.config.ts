import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TimerService } from './services/timer.service';
import { SectionTitleComponent } from './components/section-title/section-title.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    TimerService,
    SectionTitleComponent
  ]
};
