import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { APP_IMPORTS } from './app-imports';

@NgModule({
  declarations: [...APP_IMPORTS.declarations],
  imports: [...APP_IMPORTS.imports],
  providers: [...APP_IMPORTS.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
