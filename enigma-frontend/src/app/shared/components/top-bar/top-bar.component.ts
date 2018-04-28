import { Component, OnInit,OnChanges} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { User } from '../../models/user.model';
import { environment } from '../../../../environments/environment';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  subscription: Subscription;
  currentUser:User;
  
  constructor(
    private userService: UserService,
    private router: Router
  )
   {
     //getting user details and saving it in current user
    this.subscription = userService.currentUser.subscribe(
      user => {
        this.currentUser = user
      }
    );
   }

  getProfile(){
     this.router.navigate([this.currentUser.role.toLocaleLowerCase()+'/profile']);
  }
  getdashboard(){
    this.router.navigate([this.currentUser.role.toLocaleLowerCase()+'/dashboard']);
    
  }
  logout(){
      const socket = socketIo(environment.socket_url);
      socket.emit('logout',{userId:this.currentUser.id, role:this.currentUser.role});
      this.userService.purgeAuth();
      this.router.navigate(['/']);
  }

  ngOnInit() {
    
  }

}
