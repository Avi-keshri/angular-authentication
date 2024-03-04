import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<any>();

  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    })
  }

  onLogin(obj: any) {
    return this.http.post('https://freeapi.gerasim.in/api/JWT/login',
      obj,
      { headers: this.headers }
    );
  }

  getAllUsers() {
    return this.http.get('https://freeapi.gerasim.in/api/JWT/GetAllUsers');
  }

  getRefreshToken() {
    const loggedUserData = JSON.parse(localStorage.getItem('JwtLoginToken'));
    const userObj = {
      "emailId": loggedUserData.emailId,
      "token": loggedUserData.token,
      "refreshToken": loggedUserData.refreshToken
    }
    this.http.post('https://freeapi.gerasim.in/api/JWT/refresh',
      userObj,
      { headers: this.headers }
    ).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem('JwtLoginToken', JSON.stringify(res.data));
        this.$refreshTokenReceived.next(true);
      }
    });
  }
}
