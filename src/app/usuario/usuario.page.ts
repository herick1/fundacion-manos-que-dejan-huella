import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient , HttpHeaders} from  '@angular/common/http';

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


    constructor(private activatedRoute: ActivatedRoute, private  httpClient:  HttpClient, private modalService: NgbModal) {}


 //variable con todas las partidas en el front 
  usuarios = []

  toggleMenu:any 
  idSeleccionada = 0;
  nombreSelecionado="";
  apellidoSeleccionado ="";
  emailSelecionado="";
  usernameSeleccioando="";
  passwordSeleccioando="";

  AUTH_SERVER_ADDRESS:  string  =  'https://pruebas-manos-que-dejan-huella.herokuapp.com';
  ngOnInit() {
  this.getUsuario()
  }
  //funcion para obtener los usuarios
  getUsuario() {
	this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/usuario`).subscribe( 
	  //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
	  (response: any)=>{    
		console.log(response)
		if(response)
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
			this.usernameSeleccioando=this.usuarios[i].username;
			this.passwordSeleccioando= this.usuarios[i].password; 			
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
	  this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/usuario/${this.idSeleccionada}`,user,options).toPromise().then(re=>{
		this.getUsuario()
		this.modalService.dismissAll();	
	  }).catch()
	  

  }

  //funcion para abrr el modal de usuario
  eliminarUsuario(id){
 	this.idSeleccionada= id;
 	this.modalService.open(this.modalEliminar,{centered:true});
  }

  eliminar(){
	  console.log("EEEEEEEEEEEEEEEEEEEEEEEELIMINNNN> "+this.idSeleccionada)
	this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/usuario/${this.idSeleccionada}`,options).subscribe(res=>{
		this.getUsuario()
		this.modalService.dismissAll();   
	})
      
  }

  verUsuario(id){
 	this.idSeleccionada= id;
 	for(var i=0;i < this.usuarios.length; i++){
 		if(id == this.usuarios[i].id){
			this.nombreSelecionado= this.usuarios[i].nombre;
			this.apellidoSeleccionado = this.usuarios[i].apellido;
			this.emailSelecionado= this.usuarios[i].email;
			this.usernameSeleccioando=this.usuarios[i].username;
			this.passwordSeleccioando= this.usuarios[i].password; 			
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
	  this.getUsuario()
 	this.modalService.dismissAll();	
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
