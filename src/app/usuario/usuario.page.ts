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
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

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
  usuarios = []
  errores=[];

  idSeleccionada = 0;
  nombreSelecionado="";
  apellidoSeleccionado ="";
  emailSelecionado="";
  usernameSeleccionado="";
  passwordSeleccionado="";

  SERVER_ADDRESS:  string  =  'http://localhost:5000';
  //SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';
  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this.tranzabilidadService.EnviarTranzabilidad("Usuario")
    this.getUsuario()
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

  
  //funcion para obtener los usuarios
  getUsuario() {
    this.httpClient.get(`${this.SERVER_ADDRESS}/usuario`).subscribe( 
      //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
      (response: any)=>{    
        console.log(response)
        if(response)
          this.tablaOriginal=response;
          this.usuarios = response;
      }
      );
  }

  //funcion para llenar el formulario de actualizar
  actualizarUsuario(id){
    this.idSeleccionada= id;
    for(var i=0;i < this.usuarios.length; i++){
      if(id == this.usuarios[i].id){
        this.nombreSelecionado= this.usuarios[i].nombre;
        this.apellidoSeleccionado = this.usuarios[i].apellido;
        this.emailSelecionado= this.usuarios[i].email;
        this.usernameSeleccionado=this.usuarios[i].username;
        this.passwordSeleccionado= this.usuarios[i].password; 			
      }
    }
    this.modalService.open(this.modalActualizar,{centered:true});
  }

  //funcion para que abra el modal de confirmar
  confirmarActualizar(nombre,apellido, email, username, password){
    this.nombreSelecionado= nombre;
    this.apellidoSeleccionado = apellido;
    this.emailSelecionado= email;
    this.usernameSeleccionado= username;
    this.passwordSeleccionado= password;
    this.modalService.open(this.modalConfirmarActualizar,{centered:true});
  }

  //funcion para que haga el actualizar bien y haga la peticion al backend para actualizar
  Actualizar(){
    let user={
      "nombre": this.nombreSelecionado,
      "apellido":this.apellidoSeleccionado,
      "email":this.emailSelecionado,
      "username":this.usernameSeleccionado,
      "password":this.passwordSeleccionado
    }
    this.httpClient.put(`${this.SERVER_ADDRESS}/usuario/${this.idSeleccionada}`,user,options).toPromise().then(res=>{
      this.getUsuario()
      this.modalService.dismissAll();	
      this.modalService.open(this.modalExito,{centered:true});
    }).catch(
    (err)=>{
      this.errores=[]
      this.errores.push("Ups ocurrio un error")
      this.modalService.open(this.modalFracaso,{centered:true});
    }
    );


  }

  //funcion para abrr el modal de usuario
  eliminarUsuario(id){
    this.idSeleccionada= id;
    this.modalService.open(this.modalEliminar,{centered:true});
  }

  eliminar(){
    this.httpClient.delete(`${this.SERVER_ADDRESS}/usuario/${this.idSeleccionada}`,options).toPromise().then(res=>{
      this.getUsuario()
      this.modalService.dismissAll(); 
      this.modalService.open(this.modalExito,{centered:true});  
    }).catch(
    (err)=>{
      this.errores=[]
      this.errores.push("Ups ocurrio un error")
      this.modalService.open(this.modalFracaso,{centered:true});
    }
    );

  }

  verUsuario(id){
    this.idSeleccionada= id;
    for(var i=0;i < this.usuarios.length; i++){
      if(id == this.usuarios[i].id){
        this.nombreSelecionado= this.usuarios[i].nombre;
        this.apellidoSeleccionado = this.usuarios[i].apellido;
        this.emailSelecionado= this.usuarios[i].email;
        this.usernameSeleccionado=this.usuarios[i].username;
        this.passwordSeleccionado= this.usuarios[i].password; 			
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
    this.usernameSeleccionado= username;
    this.passwordSeleccionado= password;
    this.modalService.open(this.modalConfirmarCrear,{centered:true});
  }

  //funcion para que haga el actualizar bien y haga la peticion al backend para actualizar
  Crear(){
    let userss={"email":this.emailSelecionado , "password":this.passwordSeleccionado, id:0, 
    name:this.nombreSelecionado, apellido:this.apellidoSeleccionado, username:this.usernameSeleccionado}
    console.log(userss)
    this.authService.register(userss).toPromise().then((res)=>{
      this.modalService.dismissAll();	
      this.getUsuario()
      this.modalService.open(this.modalExito,{centered:true});
    }
    ).catch(
    (err)=>{
      this.errores=[]
      this.errores.push("Ups ocurrio un error")
      this.modalService.open(this.modalFracaso,{centered:true});
    }
    );


  }

/**
  * Show the search results based in the faqs
  * @function showSearchResults
  * @param {any} event
  * @return {void}
  */
  tablaOriginal=[]
  public showSearchResults(event: any): void {
    if (event.target.value.length > 0) {
      this.usuarios=[]
      for(var i=0; i< this.tablaOriginal.length; i++){
        if(this.eliminarDiacriticos(this.tablaOriginal[i].nombre).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0 || 
          this.eliminarDiacriticos(this.tablaOriginal[i].apellido).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0 || 
          this.eliminarDiacriticos(this.tablaOriginal[i].email).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0 ||
          this.eliminarDiacriticos(this.tablaOriginal[i].username).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0)
          this.usuarios.push(this.tablaOriginal[i])
      }
    }
    if (event.target.value.length == 0) {
      this.usuarios=this.tablaOriginal;
    }
  }

  eliminarDiacriticos(texto) {
    if(texto!=null)
      return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    else
      return "";
  }

}
