import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import { userSelector } from '../../store/selector/user.selectors';
import { UserState } from '../../store/reducer/user.reducer';
import { userLogin } from '../../store/action/user.actions';

export interface AuthResponse {
  data: {
    user_id: string;
    email: string;
    name: string;
    token: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSub = new BehaviorSubject<User | any>(null);

  user$: Observable<UserState>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) {
    this.user$ = this.store.pipe(select(userSelector));
  }

  signup(email: string, name: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.apiUrl + 'register', {
        email,
        name,
        password,
      })
      .pipe(
        catchError((err) => this.handleError(err, this.toastr)),
        tap(({ data }) => {
          const { user_id, email, name, token } = data;
          return this.handleAuthentication(user_id, email, name, token);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.apiUrl + 'login', {
        email,
        password,
      })
      .pipe(
        catchError((err) => this.handleError(err, this.toastr)),
        tap(({ data }) => {
          const { user_id, email, name, token } = data;
          return this.handleAuthentication(user_id, email, name, token);
        })
      );
  }

  autoLogin() {
    this.user$.subscribe((userData: UserState) => {
      const { email, name, user_id, token } = userData;
      if (!userData) {
        return;
      }
      const user = new User(user_id, email, name, token);
      if (user.token) {
        this.userSub.next(user);
      }
    });
  }

  logout() {
    this.userSub.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
  }

  private handleError(err: any, toaster: ToastrService) {
    let errMsg = 'Unexpected Error Occured!';

    if (!err.error || !err.error.error) {
      toaster.error(errMsg);
      return throwError(errMsg);
    }

    errMsg = err.error.error;
    toaster.error(errMsg);

    return throwError(errMsg);
  }

  private handleAuthentication(
    user_id: string,
    email: string,
    name: string,
    token: string
  ) {
    const user = new User(user_id, email, name, token);
    this.store.dispatch(userLogin({ email, name, token, user_id }));
    this.userSub.next(user);
  }
}
