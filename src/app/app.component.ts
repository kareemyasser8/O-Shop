import { UserService } from './shared/services/user.service';
import { getRedirectResult } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component} from '@angular/core';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // constructor(){}


constructor(private userService: UserService, private auth:AuthService,router : Router){
  auth.fireBaseUser$.asObservable().subscribe(user=>{
    if(user){
      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl')
      console.log("return url is: " + returnUrl);

      if(!returnUrl) return;

      localStorage.removeItem('returnUrl')
      router.navigateByUrl(returnUrl);

      // if(returnUrl){
      //   localStorage.removeItem('returnUrl')
      //   router.navigateByUrl(returnUrl)
      //   // console.log("return url is: " + returnUrl);
      // }

    }
  })
}




}


//--------------------------------------------------------V2----------------------------------


// constructor(private UserService : UserService ,private auth: AuthService, router: Router){

//   getRedirectResult(auth.auth).then((user) =>{
//     // console.log(user.user.uid);
//     if (user) {
//       UserService.save(user)
//       let returnUrl = localStorage.getItem('returnUrl')
//           router.navigateByUrl(returnUrl)
//     }
//   }).catch((error)=>{
//     console.log("Error, user is not found");
//   })
// }











//-------------------------------------------------------Version 1=----------------------------------




  // constructor(private auth: AuthService, router: Router){
  //   auth.user$.subscribe(user=>{
  //     if(user){
  //       let returnUrl = localStorage.getItem('returnUrl')
  //     router.navigateByUrl(returnUrl)
  //     }
  //   })
  // }




    // firebase.auth().getRedirectResult().then(result=>{
    //   let returnUrl = localStorage.getItem('returnUrl')
    //   router.navigateByUrl(returnUrl)
    // })
