import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    //return this.userService.isAuthenticated.take(1);
    return this.userService.isAuthenticated.take(1).map(bool => {
      if (bool) {
        let role = this.userService.getCurrentUser().role.toLocaleLowerCase();
        let currentUrl = state.url.toLowerCase().slice(1,state.url.length);
        var substring = currentUrl.indexOf('/');
        if(substring >=0){
          currentUrl = currentUrl.substr(0,substring);
        }
        if(role == currentUrl){
            return bool
        }
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }
}
