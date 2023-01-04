import { Unsubscribe } from '@angular/fire/database';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  userSubscription: any;

  constructor(private uS: UserService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  displayTest(){
    console.log("hello kareem, here are the results of the firebase user data")
    this.userSubscription = this.auth.fireBaseUser$.asObservable().subscribe((x)=>{
      console.log(x);
    }
    )
  }


  // async displayDataTest(uid: string){
  //   let x = this.uS.getLoggedInUser(uid);
  //   console.log("The user email is: " + (await x).email);
  //   console.log("The user name is: " + (await x).name);
  //   console.log("The user admin is: " + (await x).isAdmin);
  // }

}
