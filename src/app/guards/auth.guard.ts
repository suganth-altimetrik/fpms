import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authService.userSub.pipe(
      map((user) => {
        const isAuth = !!user;
        console.log('🚀 ~ AuthGuard ~ map ~ isAuth:', isAuth);

        if (isAuth) return true;
        else return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
