import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
const  options = { headers: new HttpHeaders({'Content-Type':'application/json'}) };
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  AUTH_SERVER_ADDRESS:  string  =  'http://pruebas-manos-que-dejan-huella.herokuapp.com';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, public  storage:  Storage) { }



  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.access_token);
          await this.storage.set("EXPIRES_IN", res.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    console.log(user.email)
    console.log(user.password)
    return this.httpClient.post('http://pruebas-manos-que-dejan-huella.herokuapp.com/login',{"email":user.email,"password": user.password},options).pipe(
    tap(async (res: AuthResponse) => {
      console.log("ssssss2")
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.access_token);
          await this.storage.set("EXPIRES_IN", res.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    if(this.storage.get("ACCESS_TOKEN"))
    return true
    else false
  }

}