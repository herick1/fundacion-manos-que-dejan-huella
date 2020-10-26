import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranzabilidadService } from '../services/tranzabilidad.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {
  focus:any;
  focus1:any;
  prueba:any;
  
  @ViewChild("modalExito", {static:true}) modalExito: ElementRef; 
  @ViewChild("modalConfirmarEnviar", {static:true}) modalConfirmarEnviar: ElementRef; 

  constructor( public menuCtrl: MenuController , private  authService:  AuthService, private httpClient:HttpClient,
   private modalService: NgbModal, private tranzabilidadService:TranzabilidadService) 
  {
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

  AUTH_SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';

  error="";
  contactar(f){
    console.log(f.value)
    var body={
      name:f.value.Nombre,
      email:f.value.Correo,
      body:f.value.Mensaje
    }
    //if(nombre!="" && correo!=""&&mensaje!=""){
      this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/contactanos/enviar`,body).subscribe( 
        //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
        (response: any)=>{    
          this.modalService.open(this.modalExito,{centered:true});

          var campo = <HTMLInputElement> document.getElementById("campo-nombre");
          var campo2 = <HTMLInputElement> document.getElementById("campo-correo");
          var campo3 = <HTMLInputElement> document.getElementById("campo-mensaje");
          campo.value="";
          campo2.value="";
          campo3.value="";
        },
        (err:any)=>{
          this.error=err.message
        }

      );
    //}
    //else{
      //  this.error="Los campos Nombre, correo y mensaje son requeridos"
    //}
      
    
  }

  ngOnInit() {
    this.tranzabilidadService.EnviarTranzabilidad("Contactanos")
    this.authService.storage.get("ACCESS_TOKEN").then(
      (res:any)=>{
        if(res)
        this.prueba=true
      else
        this.prueba=false
      })
  }

  logout(){
    this.authService.logout() 
    this.authService.storage.get("ACCESS_TOKEN").then(
      (res:any)=>{
        if(res)
        this.prueba=true
      else
        this.prueba=false
      })
  }

  confirmacionEnviar(){
    this.modalService.open(this.modalConfirmarEnviar,{centered:true});
  }


}
