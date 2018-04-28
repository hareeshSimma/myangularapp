import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../shared/services/api.service';
import { JwtService } from '../shared/services/jwt.service';
import { User } from '../shared/models/user.model'

@Injectable()
export class CloudAdminService {
  path: any;
  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  
  
  

}
