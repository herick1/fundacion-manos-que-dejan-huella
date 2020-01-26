import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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


    constructor(private activatedRoute: ActivatedRoute, private modalService: NgbModal) {}


 //variable con todas las partidas en el front 
  usuarios = []


  idSeleccionada = 0;
  nombreSelecionado="";
  apellidoSeleccionado ="";
  emailSelecionado="";
  usernameSeleccioando="";
  passwordSeleccioando="";

  ngOnInit() {

  	this.usuarios.push({
  		id:1,
  		nombre:"herick daniel",
  		apellido:"navarro hernandez",
  		email:"herick200@gmail.com",
  		username:"herick1",
  		password:"herick123456789"
  	});
  	this.usuarios.push({
  		id:2,
  		nombre:"jorge alejandro",
  		apellido:"viloria arangure",
  		email:"javiloria@gmail.com",
  		username:"joege",
  		password:"jorge1234"
  	});
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
 	this.modalService.open(this.modalActualizar);
  }

  //funcion para que abra el modal de confirmar
  confirmarActualizar(nombre,apellido, email, username, password){
	this.nombreSelecionado= nombre;
	this.apellidoSeleccionado = apellido;
	this.emailSelecionado= email;
	this.usernameSeleccioando= username;
	this.passwordSeleccioando= password;
 	this.modalService.open(this.modalConfirmarActualizar);
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
 	this.modalService.dismissAll();	
  }

  //funcion para abrr el modal de usuario
  eliminarUsuario(id){
 	this.idSeleccionada= id;
 	this.modalService.open(this.modalEliminar);
  }

  eliminar(){
      this.modalService.dismissAll();   
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
 	this.modalService.open(this.modalVer);
  }


  //funcion para llenar el formulario de mostrar
  crearUsuario(){
 	this.modalService.open(this.modalCrear);
  }

  //funcion para que abra el modal de confirmar
  confirmarCrear(nombre,apellido, email, username, password){
	this.nombreSelecionado= nombre;
	this.apellidoSeleccionado = apellido;
	this.emailSelecionado= email;
	this.usernameSeleccioando= username;
	this.passwordSeleccioando= password;
 	this.modalService.open(this.modalConfirmarCrear);
  }

  //funcion para que haga el actualizar bien y haga la peticion al backend para actualizar
  Crear(){
  	console.log(
  		this.idSeleccionada+ " " +
		this.nombreSelecionado+ " " +
		this.apellidoSeleccionado+ " " +
		this.emailSelecionado+ " " +
		this.usernameSeleccioando+ " " +
		this.passwordSeleccioando+ " " 
  	);
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
