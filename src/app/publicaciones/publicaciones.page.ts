import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient , HttpHeaders} from  '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit { 
focus:any;
  focus1:any;
  prueba:any;
  publicaciones = []
  AUTH_SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';
  //AUTH_SERVER_ADDRESS:  string  =  'http://localhost:5000';

    constructor(public menuCtrl: MenuController, private activatedRoute: ActivatedRoute, private  httpClient:  HttpClient, private modalService: NgbModal, private  authService:  AuthService,private  router:  Router) {
        this.prueba=true
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

  ngOnInit() {
       this.getLogin()
  }

  getLogin(){
    this.authService.storage.get("LOGIN_ESTATUS").then(
      (res:any)=>{
        if(res==true)
        this.prueba=true
      else
        this.prueba=false
      })
  }
  
  logout(){
    this.authService.logout().then(
      (res:any)=>{
        if(res)
          this.prueba=true
        else
          this.prueba=false
      })  
  }

  
}
