import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from  "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient , HttpHeaders} from  '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MenuController } from '@ionic/angular';
import { TranzabilidadService } from '../services/tranzabilidad.service';

const  options = { headers: new HttpHeaders({'Content-Type':'application/json'}) };

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  @ViewChild("modalVer", {static:true}) modalVer: ElementRef;
  @ViewChild("modalCrear", {static:true}) modalCrear: ElementRef;
  @ViewChild("modalConfirmarCrear", {static:true}) modalConfirmarCrear: ElementRef;
  @ViewChild("modalActualizar", {static:true}) modalActualizar: ElementRef;
  @ViewChild("modalConfirmarActualizar", {static:true}) modalConfirmarActualizar: ElementRef;
  @ViewChild("modalEliminar", {static:true}) modalEliminar: ElementRef;
  @ViewChild("modalExito", {static:true}) modalExito: ElementRef;
  @ViewChild("modalFracaso", {static:true}) modalFracaso: ElementRef;


  constructor(public menuCtrl: MenuController, private activatedRoute: ActivatedRoute, 
    private  httpClient:  HttpClient, private modalService: NgbModal, private  authService:  AuthService,
    private  router:  Router, private tranzabilidadService:TranzabilidadService) {}

  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  focus:any;
  focus1:any;
  prueba:any;
  //variable con todas las partidas en el front 
  eventos = []

  idSeleccionada = 0;
  nombreSelecionado="";
  apellidoSeleccionado ="";
  emailSelecionado="";
  usernameSeleccioando="";
  passwordSeleccioando="";

  AUTH_SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';
  
  ngOnInit() {

  }
  ngAfterViewInit(){
    this.tranzabilidadService.EnviarTranzabilidad("Usuario")
    this.getEvento()
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
        if(res){
          this.prueba=true
        }
        else{
          this.authService.emitChange('logout');
          this.router.navigateByUrl('/es/home');
        }
      })  
  }

  
  //funcion para obtener los Eventos
  headerEventos=[]
  getEvento() {
    this.eventos=[]
    this.headerEventos=[]
    this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/evento`).subscribe( 
      //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
      (response: any)=>{    
        this.headerEventos= Object.keys(response[0]);
        for(var i=0; i<this.headerEventos.length; i++){
          this.headerEventos[i]=this.headerEventos[i].replace(/_/g, " ")
        }

        for(var i=0; i< response.length; i++)
        {
          this.eventos.push(Object.values(response[i]));
        }
      }
      );
  }

  //funcion para llenar el formulario de actualizar
  actualizarUsuario(id){
    this.idSeleccionada= id;
    for(var i=0;i < this.eventos.length; i++){
      if(id == this.eventos[i].id){
        this.nombreSelecionado= this.eventos[i].nombre;
        this.apellidoSeleccionado = this.eventos[i].apellido;
        this.emailSelecionado= this.eventos[i].email;
        this.usernameSeleccioando=this.eventos[i].username;
        this.passwordSeleccioando= this.eventos[i].password; 			
      }
    }
    this.modalService.open(this.modalActualizar,{centered:true});
  }

  //funcion para que abra el modal de confirmar
  confirmarActualizar(nombre,apellido, email, username, password){
    this.nombreSelecionado= nombre;
    this.apellidoSeleccionado = apellido;
    this.emailSelecionado= email;
    this.usernameSeleccioando= username;
    this.passwordSeleccioando= password;
    this.modalService.open(this.modalConfirmarActualizar,{centered:true});
  }

  //funcion para que haga el actualizar bien y haga la peticion al backend para actualizar
  Actualizar(){
  	console.log(
  		this.idSeleccionada+ " " +
      this.nombreSelecionado+ " " +
      this.apellidoSeleccionado+ " " +
      this.emailSelecionado+ " " +
      this.usernameSeleccioando+ " " +
      this.passwordSeleccioando+ " " 
      );
    let user={
      "nombre": this.nombreSelecionado,
      "apellido":this.apellidoSeleccionado,
      "email":this.emailSelecionado,
      "username":this.usernameSeleccioando,
      "password":this.passwordSeleccioando
    }
    this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/usuario/${this.idSeleccionada}`,user,options).subscribe(res=>{
      this.getEvento()
      this.modalService.dismissAll();	
    })


  }

  //funcion para abrr el modal de Eventos
  eliminarEventos(id){
    this.idSeleccionada= id;
    this.modalService.open(this.modalEliminar,{centered:true});
  }

  eliminar(){
    console.log("EEEEEEEEEEEEEEEEEEEEEEEELIMINNNN> "+this.idSeleccionada)
    this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/eventos/${this.idSeleccionada}`,options).subscribe(res=>{
      this.getEvento()
      this.modalService.dismissAll();   
    })

  }

  verEventos(id){
    this.idSeleccionada= id;
    for(var i=0;i < this.eventos.length; i++){
      if(id == this.eventos[i].id){
        this.nombreSelecionado= this.eventos[i].nombre;
        this.apellidoSeleccionado = this.eventos[i].apellido;
        this.emailSelecionado= this.eventos[i].email;
        this.usernameSeleccioando=this.eventos[i].username;
        this.passwordSeleccioando= this.eventos[i].password; 			
      }
    }
    this.modalService.open(this.modalVer,{centered:true});
  }


  //funcion para llenar el formulario de mostrar
  crearUsuario(){
    this.modalService.open(this.modalCrear,{centered:true});
  }

  //funcion para que abra el modal de confirmar
  confirmarCrear(nombre,apellido, email, username, password){
    this.nombreSelecionado= nombre;
    this.apellidoSeleccionado = apellido;
    this.emailSelecionado= email;
    this.usernameSeleccioando= username;
    this.passwordSeleccioando= password;
    this.modalService.open(this.modalConfirmarCrear,{centered:true});
  }

  //funcion para que haga el actualizar bien y haga la peticion al backend para actualizar
  Crear(){
  	console.log(
  		" AJA" +
      this.nombreSelecionado+ " " +
      this.apellidoSeleccionado+ " " +
      this.emailSelecionado+ " " +
      this.usernameSeleccioando+ " " +
      this.passwordSeleccioando+ " " 
      );
    let userss={"email":this.emailSelecionado , "password":this.passwordSeleccioando, id:0, name:this.nombreSelecionado, apellido:this.apellidoSeleccionado}
    this.authService.register(userss).toPromise().then((res)=>{
      this.modalService.dismissAll();	
      this.getEvento()
    }
    ).catch(
    (err)=>{
      console.log("ERR"+ err.status)
    }
    );


  }

/**
  * Show the search results based in the faqs
  * @function showSearchResults
  * @param {any} event
  * @return {void}
  */
  public showSearchResults(event: any): void {
    if (event.target.value.length > 0) {
      console.log(event.target.value);
    }
    if (event.target.value.length == 0) {
      console.log("se borro todo en el input es decir que hay que traer toda la tabla");
    }
  }


}
