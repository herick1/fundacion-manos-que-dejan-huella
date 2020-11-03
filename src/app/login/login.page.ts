import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from  "@angular/router";
import { AuthService } from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import { TranzabilidadService } from '../services/tranzabilidad.service';

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
  constructor( public menuCtrl: MenuController, private http:HttpClient, private  authService:  AuthService,
   private  router:  Router, private tranzabilidadService:TranzabilidadService) { 
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
      this.authService.emitChange('Data from child');
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

  recuperarClave(correo){
    this.authService.recuperarClave(correo).toPromise().then((res)=>{

    });

  }

}
