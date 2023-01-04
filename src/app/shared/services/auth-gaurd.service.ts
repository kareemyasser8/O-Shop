import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(private auth:AuthService, private router: Router){}


//we can get the url that the user try to access
//when the auth gaurd kicked in


//Observable<boolean>
  canActivate(route, state:RouterStateSnapshot): Observable<boolean>{

    // we going to transform this observable from a user object into a observable of boolean
    // and angular will internally subscribe to this observable and then
    // remove the subscription later

    console.log("hello kareem, here are the results of the firebase user data")

    return this.auth.appUser$.pipe(map((result)=>{
      console.log(result);
      if(result){
        console.log("yes you can go to the page")
        console.log(state.url);
        return true
      }else{
        console.log("User is not found ya m3lem")
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
      }
      return false;
    })
    )


  }

}


   // console.log(this.auth.kareme)
    // if(this.auth.kareme == "done"){
    //     return true;
    // }else{
    //   this.router.navigate(['/login'])
    //   return false;
    // }





//-------------------------------------------code adeem------------------------------------





// constructor(private auth: AuthService, private router: Router) { }

// canActivate(route, state:RouterStateSnapshot): boolean{

//   if(this.auth.user){
//     return true;
//   }else{
//     //el queryParams de 3shan law el user 7ab ye8ayar el url, fa howa yeraga3o lel login w ye2olo kman
//     //el 3enwan el 8alat ely kan nawy yeda5alo

//     this.router.navigate(['/login'],{queryParams:{returnUrl: state.url}})
//     return false
//   }

// }




// console.log("The user logged status == >" + this.auth.isLoggedIn())

// if(this.auth.isLoggedIn()){
//   return true
// }else{

//   //we use queryParams for sending any optional parameters
//   this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}})
//   return false;
// }
