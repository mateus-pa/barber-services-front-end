import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/services/interceptor';

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([AuthInterceptor]))],
}).catch((err) => console.error(err));
