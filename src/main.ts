import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// Importamos el componente principal renombrado
import { AppMainComponent } from './app/app';

bootstrapApplication(AppMainComponent, appConfig)
  .catch((err) => console.error(err));
