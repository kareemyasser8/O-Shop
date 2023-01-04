import { AppUser } from '../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { Database,set, ref, onValue, Unsubscribe, update,get} from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { User, UserInfo } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDatabaseReference: any;
  user: AppUser;

  constructor(public db: AngularFireDatabase) {}

  save(user: UserInfo){
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    })

  }

  get(uid:string): AngularFireObject<AppUser>{
    return this.db.object('/users/'+uid);
  }

  getAllUsers():Observable<AppUser[]>{
    return this.db.list<AppUser>('/users')
    .snapshotChanges()
    .pipe(
      map(result=>
        result.map(c=>{
          const data = c.payload.val() as AppUser;
          const $key = c.payload.key;
          return { $key, ...data };
        })
      )
    )

  }

}


    //  this.userDatabaseReference = ref(this.db, 'users/'+ value.uid)
    // update(this.userDatabaseReference,{
    //   name: value.displayName,
    //   email: value.email,
    // })



// async getLoggedInUser(uid:string): Promise<AppUser>{
//   let user: AppUser;
//   let result

//   //If you want to just get the value once and return it,
//   //you'll want to use get instead of onValue.
//   //Then you can also use async/await.

//   const snapshot = await get(this.userDatabaseReference)
//   user = snapshot.val();

// //------------------------------don't use this method-----------------------------------------
//   // onValue(this.userDatabaseReference,(snapshot)=>{
//   //     result = snapshot.val();
//   //     user = result;
//   //   },(error)=>{
//   //     console.log(error);
//   //   });
// //-------------------------------------------------------------------------------------


//   return user;
// }
