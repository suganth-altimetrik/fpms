import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { IconsModule } from './icons/icons.module';
import { CardComponent } from './card/card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NewInvestmentComponent } from './new-investment/new-investment.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth/auth.component';
import { reducer, userFeatureKey } from './auth/redux/reducer/user.reducer';
import { metaReducers } from './auth/redux/reducer/meta-reducer';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { InvestTableComponent } from './invest-table/invest-table.component';
import { InvestChartComponent } from './invest-chart/invest-chart.component';
import { InvestSummaryComponent } from './invest-summary/invest-summary.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

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
    AuthComponent,
    InvestTableComponent,
    InvestChartComponent,
    InvestSummaryComponent,
    DynamicTableComponent,
  ],
  imports: [
    BrowserModule,
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
