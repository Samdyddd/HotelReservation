import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from '../service/user-login.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		public userLoginService: UserLoginService) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(!this.userLoginService.isLoggedIn()){
			this.router.navigateByUrl("/login")
		}
		return this.userLoginService.isLoggedIn();
		// return true;
	}
}
