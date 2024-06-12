import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Invest } from '../models/invest.model';
import { Subject, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class InvestApiService {
  investList = new Subject();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  saveInvest(input: Invest) {
    return this.http.post(environment.apiUrl + 'invest/save', input).pipe(
      catchError((err) => {
        this.toastr.error(err?.message);
        console.log(err);
        return throwError(err);
      })
    );
  }

  recentInvestments() {
    return this.http.get(environment.apiUrl + 'invest/recent').pipe(
      catchError((err) => {
        this.toastr.error(err?.message);
        console.log(err);
        return throwError(err);
      })
    );
  }

  topInvestments() {
    return this.http.get(environment.apiUrl + 'invest/top').pipe(
      catchError((err) => {
        this.toastr.error(err?.message);
        console.log(err);
        return throwError(err);
      })
    );
  }

  getInvestmentTrend() {
    return this.http.get(environment.apiUrl + 'invest/trend').pipe(
      catchError((err) => {
        this.toastr.error(err?.message);
        console.log(err);
        return throwError(err);
      })
    );
  }

  summaryInvestments() {
    return this.http.get(environment.apiUrl + 'invest/total').pipe(
      catchError((err) => {
        this.toastr.error(err?.message);
        console.log(err);
        return throwError(err);
      })
    );
  }

  dynamicDataStart() {
    return this.http.get(environment.apiUrl + 'dynamic-data-start').pipe(
      catchError((err) => {
        this.toastr.error(err?.message);
        console.log(err);
        return throwError(err);
      })
    );
  }

  dynamicDataStop() {
    return this.http.get(environment.apiUrl + 'dynamic-data-stop').pipe(
      catchError((err) => {
        this.toastr.error(err?.message);
        console.log(err);
        return throwError(err);
      })
    );
  }
}
