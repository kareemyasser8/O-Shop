import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurd implements CanActivate {

 constructor(private auth: AuthService, private UserService: UserService){}

  canActivate() : Observable<boolean>{
    return this.auth.appUser$
    .pipe( map(appUser => appUser.isAdmin))

  }

// SwitchMap also does mapping but it switch to the new observable
//so it start with the first observable and then switch to
// a new observable and forget about the first observable


}


// constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

// async canActivate(route, state:RouterStateSnapshot): Promise<boolean> {

//   if(this.auth.user){

//     console.log(this.auth.user);
//     let uid = this.auth.user.stsTokenManager.uid
//     let result = this.userService.getLoggedInUser(uid);

//     console.log("Check if the user is admin = "+ (await result).isAdmin);
//     if((await result).isAdmin == true){
//       return true;
//     }else{
//       return false;
//     }

//   }else{
//     // this.router.navigate([''])
//     return false;
//   }
// }
































// let user = getRedirectResult(this.auth.auth).then((user)=>{
//   return user;
// }



// getRedirectResult(this.auth.auth).then((user)=>{
//   let isAdmin=  this.userService.get(user.user.uid).isAdmin;
//  if(isAdmin == true){
//   return true;
//  }
// })
