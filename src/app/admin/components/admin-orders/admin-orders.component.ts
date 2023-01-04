import { AuthService } from '../../../shared/services/auth.service';
import { map, Observable, Subscription } from 'rxjs';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { AngularFireObject, SnapshotAction } from '@angular/fire/compat/database';
import { UserService } from 'src/app/shared/services/user.service';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = []
  ordersSubscription: Subscription

  constructor(
    private orderService: OrderService, private userService: UserService) {


  }

  getWrittenTime(time: number) {
    return new Date(time).toLocaleString();
  }

  // getUserName(uid: string): string{
  //   for(let i = 0; i < this.users.length; i++){
  //     if(this.users[i].$key == uid) return this.users[i].name
  //   }
  //   return ""
  // }


  ngOnInit(){

  //  this.usersSubscription = this.userService.getAllUsers().subscribe(
  //   (result:AppUser[])=>{
  //     this.users = result
  //   }
  //  )

    let orders$ = this.orderService.getOrders();
    this.ordersSubscription = orders$.subscribe(result => {
      result.map(c => {
        this.orders.push(c);
      }
      )
    })
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
    // this.usersSubscription.unsubscribe();
  }







}
