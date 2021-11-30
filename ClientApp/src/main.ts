import "./polyfills";
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


enableProdMode();

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic(providers).bootstrapModule(AppModule)
 // .catch(err => console.log(err));

//const platform = platformBrowserDynamic();
//platform.bootstrapModule(AppModule);



