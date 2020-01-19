import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
const  options = { headers: new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}) };
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private http:HttpClient, private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }
  login(form){
    this.http.post("http://pruebas-manos-que-dejan-huella.herokuapp.com/login",{"email":"jorge5178877@gmail.com","password":"jorge"},options).toPromise().then(
      (response:any)=> {
        console.log(response)
      }
    )
  }
/*
  login(form){
    this.authService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('/');
    });
  }
  */
}