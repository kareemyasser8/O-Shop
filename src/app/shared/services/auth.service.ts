import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { signInWithRedirect, UserInfo } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject, Observable, of, Subject, switchMap } from 'rxjs';

import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

const provider = new GoogleAuthProvider();
let signUpGoogle
let debugRedirectResult

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  afAuth: Auth;
  appUser: AppUser
  fireBaseUser$ = new Subject<UserInfo>()  //Firebase User

  //ActivatedRoute is used to get the current route and extract the returnUrl Paramter;

  constructor(private userService: UserService,
    private afApp: FirebaseApp,
    private router: Router,
     private route: ActivatedRoute){

    this.afAuth = getAuth(this.afApp);
    this.fireBaseUser$ = new BehaviorSubject(null);

    //---------------------------code is not executed here in the authgaurd service------------------------------
    this.afAuth.onAuthStateChanged((x)=>{
        this.fireBaseUser$.next(x);

      // this.fireBaseUser$ = new Observable<UserInfo>((observer)=>{
      //   observer.next(x);
      // })
    })
    // -------------------------------------------------------------------------------------------------
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    console.log("return Url : " + returnUrl)
    localStorage.setItem('returnUrl',returnUrl)
    // localStorage.setItem('returnUrl',returnUrl)
    signInWithRedirect(this.afAuth, provider)
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      console.log("The user is logged out");
      this.router.navigate([''])
    });
  }


 get appUser$(): Observable<AppUser>{

  return this.fireBaseUser$.asObservable()
  .pipe( switchMap((user)=>
   { if(user){
     return this.userService.get(user.uid).valueChanges()
    }
    else return of(null)
  }
    ))
 }




}






///------------------------------code adeem --------------------------------------------


  //Observable<UserInfo> = new BehaviorSubject(null)

//   auth: Auth;
//   user: any;
//   router: Router;

//   constructor(
//     private afApp: FirebaseApp,
//      private route: ActivatedRoute,
//      private userService: UserService
//      ){
//     this.auth = getAuth(this.afApp);
//     this.auth.onAuthStateChanged(x=>this.user = x);
//   }

//   login(){
//     //law feh saf7a mo3ayana kanet mawgoda fel link w lazem yet3amal login abl mat5oshaha
//     // fa howa byeheck el link law feh 'returnUrl' 3shan yewadeeh lel saf7a de b3d el login.

//     //law mafeesh returnUrl, wadeeh lel root => '/'

//      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'

//      localStorage.setItem('returnUrl',returnUrl)
//      signInWithRedirect(this.auth, provider)

//     //  getRedirectResult (this.auth).then((user)=>{
//     //   console.log("The user is here");
//     //  })
//     //  console.log(this.user);


//     //  if(this.user != null){
//     //   console.log("The user is here");
//     //   // let returnUrl = localStorage.getItem('returnUrl')
//     //   // this.router.navigateByUrl(returnUrl);
//     //  }
//   }

//   logout(){
//     this.auth.signOut().then(()=>{
//       console.log("The user is logged out");
//     });
//   }

//  get appUser() {

//       let user1: AppUser;

//       let uid =  this.user.stsTokenManager.uid
//       let result = this.userService.getLoggedInUser(uid);
//       // let result = async() => { return this.userService.getLoggedInUser(uid)}
//       // result().then((value)=>{
//       //   user1 = value;
//       // })

//       return result;
//   }
