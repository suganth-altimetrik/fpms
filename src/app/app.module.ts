import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { HeaderComponent } from './components/ui-components/header/header.component';
import { IconsModule } from '../assets/icons/icons.module';
import { CardComponent } from './components/ui-components/card/card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NewInvestmentComponent } from './features/new-investment/new-investment.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './features/login/login.component';
import { reducer, userFeatureKey } from '../store/reducer/user.reducer';
import { metaReducers } from '../store/reducer/meta-reducer';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { InvestTableComponent } from './components/functional-component/invest-table/invest-table.component';
import { InvestChartComponent } from './components/functional-component/invest-chart/invest-chart.component';
import { InvestSummaryComponent } from './features/dashboard/invest-summary/invest-summary.component';
import { DynamicTableComponent } from './components/functional-component/dynamic-table/dynamic-table.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PushNotificationComponent } from '../push-notification/push-notification.component';
import { ButtonComponent } from './components/ui-components/button/button.component';
import { ThemeSwitcherComponent } from './components/functional-component/theme-switcher/theme-switcher.component';
import { ToggleButtonComponent } from './components/ui-components/toggle-button/toggle-button.component';

import { AgCharts } from 'ag-charts-angular';
import { InvestAgChartComponent } from './components/functional-component/invest-ag-chart/invest-ag-chart.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/register/register.component';
import { TextInputComponent } from './components/ui-components/text-input/text-input.component';
import { NewInvestmentModuleRoutingModule } from './features/new-investment/new-investment-module-routing.module';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: [userFeatureKey] })(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
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
    InvestAgChartComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AgCharts,
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
