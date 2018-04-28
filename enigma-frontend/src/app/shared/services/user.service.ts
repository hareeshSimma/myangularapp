import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';


@Injectable()
export class UserService {


  private currentUserSubject = new BehaviorSubject<User>(new User('', '', '', '', '', '', ''));
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  auth2: any;

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) { }



  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User('', '', '', '', '', '', ''));
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  // attemptAuth(type, credentials): Observable<User> {
  //   const route = (type === 'login') ? '/login' : '';
  //   return this.apiService.post('/users' + route, {user: credentials})
  //   .map(
  //     data => {
  //       this.setAuth(data.user);
  //       return data.user;
  //     }
  //   );
  // }
  attemptAuth(type, credentials): Observable<User> {
    const route = '/login'
    return this.apiService.post(route, { user: credentials })
      .map(
      data => {
        if (!data.user.twf) { this.setAuth(data.user); }
        return data.user;
      }
      )
  }
  verifyOTP(type, credentials) {
    return this.apiService.post('/login/otpVerification', { user: credentials })
      .map(
      data => {
        this.setAuth(data.user)
        return data.user;
      }
      )
  }
  // resendOTP(type, credentials) {
  //   return this.apiService.post('/resendotp', { user: credentials})
  //   .map(
  //     data => {
  //       this.setAuth(data.user)
  //       return data.user;
  //       }
  //    )
  // }

  resendOTP(type, credentials) {
    return this.apiService.post('/login/resendotp', { user: credentials })
      .map(
      data => {
        return data;
      }
      )
  }

  googleAuth(data): Observable<User> {
    const route = '/login/loginWithgoogle/'
    return this.apiService.post(route, { userObject: data })
      .map(
      data => {

        this.setAuth(data.user);
        return data.user;
      }
      )
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user', { user })
      .map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });;
  }

  getChart(type) {
    return this.apiService
      .get('/charts/' + type)
      .map(data => {
        return data;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });;
  }
  getRegularExpression() {
    const route = "/getpasswordpolicy";
    return this.apiService.get(route).
      map(data => {
        return data;
      })
  }
  updatePassword(user) {
    const route = "/users/updatePassword";
    return this.apiService
      .put(route, { user })
      .map(data => {
        // Update the currentUser observable
        return data;
      });
  }

  registration(type, userdata): Observable<any> {
    return this.apiService.post('/users', { user: userdata })
      .map(
      data => {
        // this.setAuth(data.user);
        return data;
      }
      );
  }
  resetpassword(userdata) {
     console.log(userdata);
    console.log("this is front");
   
    return this.apiService.put('/users/verify',{ user: userdata })
      .map(
      data => {
        console.log(data);
        return data;
      }
      );
  }
  sendResetpasswordlink(userdata) {
    return this.apiService.post('/forgetpassword', { user: userdata })
      .map(
      data => {
        return data;
      }
      );
  }

  // send path to main module
  private subject = new Subject<any>();

  sendPath(path: any) {
    this.subject.next(path);
  }

  getPath(): Observable<String> {
    return this.subject.asObservable();
  }

}
