import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// 阻止开发者模式的检查
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
