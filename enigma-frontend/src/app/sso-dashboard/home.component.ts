import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
// import {LoginService} from './login.service';
import {MdSnackBar} from '@angular/material';
import { UserService } from '../shared/services/user.service';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'home-app-login',
  templateUrl: './home.component.html',
//   providers : [LoginService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        // private loginService: LoginService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}
    public appUrl= '';
    ngOnInit() {
        this.route.url.subscribe( data => {
            
        });
      this.appUrl = environment.api_url;
      let userData = this.route.snapshot.queryParams["userData"];
      var bytes  = CryptoJS.AES.decrypt(userData.toString(), '123!');
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     let role = decryptedData.role.toLowerCase();
      this.userService.setAuth(decryptedData);
      this.router.navigate(['/'+role]);
    };
 openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}
