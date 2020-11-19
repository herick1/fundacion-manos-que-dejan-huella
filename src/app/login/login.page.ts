import { Component, OnInit, EventEmitter, Output, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from  "@angular/router";
import { AuthService } from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import { TranzabilidadService } from '../services/tranzabilidad.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  focus:any;
  focus1:any;
  prueba:any;
  mensajeError:any;
  errores=[]

  @ViewChild("modalRecuperarClave", {static:true}) modalRecuperarClave: ElementRef;
  @ViewChild("modalExito", {static:true}) modalExito: ElementRef;
  @ViewChild("modalFracaso", {static:true}) modalFracaso: ElementRef;

  constructor( public menuCtrl: MenuController, private http:HttpClient, private  authService:  AuthService,
    private  router:  Router, private tranzabilidadService:TranzabilidadService, private modalService: NgbModal) { 
  }
  
  ngOnInit() {


  }

  ngAfterViewInit(){
    this.tranzabilidadService.EnviarTranzabilidad("Login")
    this.authService.storage.get("ACCESS_TOKEN").then(
      (res:any)=>{
        if(res)
          this.prueba=true
        else
          this.prueba=false
      })
  }

  
  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  login(correo, clave){
    let userss={"email":correo , "password":clave, id:0, name:"", apellido:""}
    this.authService.login(userss).toPromise().then((res)=>{
      this.authService.emitChange('login');
      //this.onLoginExitoso()
      this.router.navigateByUrl('/es/home');
      //location.reload(true);
    }
    ).catch(
    (err)=>{
      if(err.status==401)
        this.mensajeError="Credenciales invalidas"
      else
        this.mensajeError="Error en la comunicación con el servidor"


    }
    );
  }

  AbrirModalRecuperarClave(email){
    console.log(email)
    this.correoRecuperarModel=email;
    this.modalService.open(this.modalRecuperarClave,{centered:true});
  }
  correoRecuperarModel=""
  recuperarClave(correo){
    this.authService.recuperarClave(correo).toPromise().then((res)=>{
      this.modalService.dismissAll();  
      this.modalService.open(this.modalExito,{centered:true});
    }).catch(
    (error)=>{
      this.errores=[];
      this.modalService.dismissAll();
      this.errores.push("ocurrio un error en el servidor")
      this.modalService.open(this.modalFracaso,{centered:true});
    }

    );

  }

}
