import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private UserService:UserService) { }

  canActivate (): Observable<boolean> {

  return  this.auth.user$  
           .switchMap(user => this.UserService.get(user.uid))
                         .map(AppUser => AppUser.isAdmin); 
  }
}
