import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new Subject<boolean>();
  constructor(private hhtp: HttpClient) { }

  // current user : which is logged in
  public getCurrentUser(){
    return this.hhtp.get(`${baseUrl}/current-user`);
  }

  // Generate Token
  public generateToken(loginData:any)
  {
    return this.hhtp.post(`${baseUrl}/generate-token`,loginData)
  }

  // login user : set token to local storeage
  public loginUser(token:any)
  {
    localStorage.setItem("token",token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  // is Login : user is login or not
  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null )
    {
      return false;
    }else
    {
      return true;
    }
  }

  // logout : remove token for local storage
  public logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token : return the token from loacl storage
  public getToken()
  {
    return localStorage.getItem('token')
  }

  // set user details 
  public setUser(user:any)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }

  // get user
  public getUser()
  {
    let userStr = localStorage.getItem("user");
    if(userStr != null)
    {
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole()
  {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
