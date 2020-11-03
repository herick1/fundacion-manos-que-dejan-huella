import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
const  options = { headers: new HttpHeaders({'Content-Type':'application/json', 'Access-Control-Expose-Headers':
'x-access-token','x-access-token':'*','Accept': 'application/json','cache-control': 'no-cache', 
'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 
'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers'}) };    
//"Content-Type": "application/x-www-form-urlencoded; charset=utf-8", 
          
          
        //  'Access-Control-Allow-Credentials' : 'true",
          //'Access-Control-Allow-Methods' : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",  
@Injectable({
  providedIn: 'root'
})


export class AuthService {

 // AUTH_SERVER_ADDRESS:  string  =  'http://localhost:5000';
  AUTH_SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';
  
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
    let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`,{"email":user.email,"password": user.password},{headers: headers}).pipe(
    tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.access_token);
          await this.storage.set("EXPIRES_IN", res.expires_in);
          await this.storage.set("LOGIN_ESTATUS", true);
          this.authSubject.next(true);
        }
      })
    );
  }
  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    await this.storage.remove("LOGIN_ESTATUS");
    this.storage.clear()
    this.authSubject.next(false);
  }

  isLoggedIn() {
   this.storage.get("LOGIN_ESTATUS").then(
     (res:any)=>{
      if(res==true)
        return true
      else
        return false
     })
  }

  recuperarClave(correo){
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/recuperarClave`,{"email":correo});

    }

//********************* METODOS PARA COMUNICAR COMPONENTE PADRE CON HIJO ******************************//
// Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

}