import {Injectable} from '@angular/core'
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot} from '@angular/router'
import {Observable} from 'rxjs'

import {LoginService} from '../login/login.service'

@Injectable()
export class LoginRequiredGuard implements CanActivate, CanActivateChild {
  constructor (private loginService: LoginService, private router: Router) {}

  redirectIfNotLoggedIn (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    if (this.loginService.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.redirectIfNotLoggedIn(route, state)
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.redirectIfNotLoggedIn(route, state)
  }
}
