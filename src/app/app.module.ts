import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { HomeComponent } from './ui-components/home/home.component';
import { HeaderComponent } from './ui-components/header/header.component';
import { IconsModule } from './icons/icons.module';
import { CardComponent } from './feature-components/card/card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NewInvestmentComponent } from './ui-components/new-investment/new-investment.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { reducer, userFeatureKey } from '../store/reducer/user.reducer';
import { metaReducers } from '../store/reducer/meta-reducer';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { InvestTableComponent } from './feature-components/invest-table/invest-table.component';
import { InvestChartComponent } from './feature-components/invest-chart/invest-chart.component';
import { InvestSummaryComponent } from './feature-components/invest-summary/invest-summary.component';
import { DynamicTableComponent } from './feature-components/dynamic-table/dynamic-table.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PushNotificationComponent } from '../push-notification/push-notification.component';
import { ButtonComponent } from '../shared/button/button.component';
import { ThemeSwitcherComponent } from './feature-components/theme-switcher/theme-switcher.component';
import { LoginComponent } from './ui-components/login/auth.component';
import { ToggleButtonComponent } from './ui-components/toggle-button/toggle-button.component';
import { TextInputComponent } from '../shared/text-input/text-input.component';
import { NewInvestmentModuleRoutingModule } from './ui-components/new-investment-module/new-investment-module-routing.module';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: [userFeatureKey] })(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CardComponent,
    NewInvestmentComponent,
    LoginComponent,
    InvestTableComponent,
    InvestChartComponent,
    InvestSummaryComponent,
    DynamicTableComponent,
    PushNotificationComponent,
    ButtonComponent,
    ThemeSwitcherComponent,
    ToggleButtonComponent,
    TextInputComponent,
  ],
  imports: [
    BrowserModule,
    NewInvestmentModuleRoutingModule,
    AppRoutingModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    StoreModule.forFeature(userFeatureKey, reducer),
    IconsModule,
    NgApexchartsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
