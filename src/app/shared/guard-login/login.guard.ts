import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from  '@ionic/storage';

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private router: Router, public  storage:  Storage) {}

	canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

		return this.storage.get("ACCESS_TOKEN").then(res => {
			if (res) {
				this.router.navigate(['es/home']);
				return false;
			}
			return true;
		});
	}


}
