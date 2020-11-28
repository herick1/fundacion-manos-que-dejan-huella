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
  imagenSeleccionadaaa="data:image/png;base64,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"
  idSeleccionada = 0;
  nombreSelecionado="";
  fechainicioSeleccionado ="";
  fechaFinSeleccionado="";
  descripcionSeleccionado="";
  direccionSeleccionado="";

  //SERVER_ADDRESS:  string  =  'http://localhost:5000';
  SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';
  ngOnInit() {
    // this.errores.push("jajajja")
    //this.modalService.open(this.modalFracaso,{centered:true});
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
    this.httpClient.get(`${this.SERVER_ADDRESS}/evento`).subscribe( 
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
        this.tablaOriginal=this.eventos
      }
      );
  }

  //funcion para llenar el formulario de actualizar
  actualizarEvento(id){
    console.log(id)
    this.idSeleccionada= id;
    console.log( this.eventos)
    for(var i=0;i < this.eventos.length; i++){
      if(id == this.eventos[i][0]){
        this.nombreSelecionado= this.eventos[i][1];
        let Arraydate = this.eventos[i][2].split("-")
        this.fechainicioSeleccionado = Arraydate[2]+ "-"+Arraydate[1]+"-"+Arraydate[0]
        Arraydate = this.eventos[i][3].split("-")
        this.fechaFinSeleccionado= Arraydate[2]+ "-"+Arraydate[1]+"-"+Arraydate[0]
        this.descripcionSeleccionado=this.eventos[i][4];
        this.direccionSeleccionado= this.eventos[i][5]; 			
      }
    }
    this.modalService.open(this.modalActualizar,{centered:true});
  }

  //funcion para que abra el modal de confirmar
  confirmarActualizar(nombre,fecha_inicio, fecha_fin, direccion, descripcion){
    this.nombreSelecionado= nombre;
    this.fechainicioSeleccionado = fecha_inicio;
    this.fechaFinSeleccionado= fecha_fin;
    this.descripcionSeleccionado= direccion;
    this.direccionSeleccionado= descripcion;
    this.modalService.open(this.modalConfirmarActualizar,{centered:true});
  }

  //funcion para que haga el actualizar bien y haga la peticion al backend para actualizar
  Actualizar(){
    let evento={
      "nombre": this.nombreSelecionado,
      "fechaini":this.fechainicioSeleccionado,
      "fechafin":this.fechaFinSeleccionado,
      "descripcion":this.descripcionSeleccionado,
      "direccion":this.direccionSeleccionado
    }
    this.httpClient.put(`${this.SERVER_ADDRESS}/evento/actualizar/${this.idSeleccionada}`,evento,options).subscribe(res=>{
      this.getEvento()
      this.modalService.dismissAll();	
      this.modalService.open(this.modalExito,{centered:true});
    },
    error => {
      this.errores=[]
      this.errores.push(error.error)
      this.modalService.open(this.modalFracaso,{centered:true});
    })


  }

  //funcion para abrr el modal de Eventos
  eliminarEvento(id){
    console.log(id)
    this.idSeleccionada= id;
    this.modalService.open(this.modalEliminar,{centered:true});
  }

  eliminar(){
    this.httpClient.delete(`${this.SERVER_ADDRESS}/evento/eliminar/${this.idSeleccionada}`,options).subscribe(res=>{
      this.getEvento()
      this.modalService.dismissAll();  
      this.modalService.open(this.modalExito,{centered:true});
    },
    error => {
      this.errores=[]
      this.errores.push(error)
      this.modalService.open(this.modalFracaso,{centered:true});
    })
  }

  verEvento(id){
    this.idSeleccionada= id;
    for(var i=0;i < this.eventos.length; i++){
      if(id == this.eventos[i][0]){
        this.nombreSelecionado= this.eventos[i][1];
        this.fechainicioSeleccionado = this.eventos[i][2];
        this.fechaFinSeleccionado= this.eventos[i][3];
        this.descripcionSeleccionado=this.eventos[i][4];
        this.direccionSeleccionado= this.eventos[i][5]; 			
      }
    }
    this.modalService.open(this.modalVer,{centered:true});
  }


  //funcion para llenar el formulario de mostrar
  crearUsuario(){
    this.modalService.open(this.modalCrear,{centered:true});
  }

  //funcion para que abra el modal de confirmar
  confirmarCrear(nombre,fecha_inicio, fecha_fin, descripcion, direccion){
    console.log(fecha_inicio, fecha_fin)
    this.nombreSelecionado= nombre;
    this.fechainicioSeleccionado = fecha_inicio;
    this.fechaFinSeleccionado= fecha_fin;
    this.descripcionSeleccionado= descripcion;
    this.direccionSeleccionado= direccion;
    this.modalService.open(this.modalConfirmarCrear,{centered:true});
  }

  //funcion para que haga el actualizar bien y haga la peticion al backend para actualizar

  formularioCrear: FormData;
  Crear(){
    this.formularioCrear.append('nombre', this.nombreSelecionado);
    this.formularioCrear.append('fechaini', this.fechainicioSeleccionado);
    this.formularioCrear.append('fechafin', this.fechaFinSeleccionado);
    this.formularioCrear.append('descripcion', this.descripcionSeleccionado);
    this.formularioCrear.append('direccion', this.direccionSeleccionado);

    this.httpClient.post(`${this.SERVER_ADDRESS}/evento/crear`, this.formularioCrear).subscribe(
      (res:any )=> {
        this.modalService.dismissAll();
        this.modalService.open(this.modalExito,{centered:true})
        this.getEvento();
        this.formularioCrear.delete('nombre');
        this.formularioCrear.delete('fechaini');
        this.formularioCrear.delete('fechafin');
        this.formularioCrear.delete('descripcion');
        this.formularioCrear.delete('direccion');
      },
      error => {
        this.errores=[]
        this.errores.push(error)
        this.modalService.open(this.modalFracaso,{centered:true});
        this.formularioCrear.delete('nombre');
        this.formularioCrear.delete('fechaini');
        this.formularioCrear.delete('fechafin');
        this.formularioCrear.delete('descripcion');
        this.formularioCrear.delete('direccion');
        
      })

  }
  errores=[]
  onFileChange(evt: any) {
    var target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files')

      let fileList: FileList = target.files;
    let file = fileList[fileList.length-1]
    
    this.formularioCrear = new FormData();
    this.formularioCrear.append('foo', file, file.name);
    console.log("llegueeee"+ file.name)
/*    
   // this.httpClient.post(`${this.SERVER_ADDRESS}/back/cliente/import`, this.formularioCrear).subscribe(
   this.httpClient.post(`http://localhost:5000/evento/crear`, this.formularioCrear).subscribe(
      
      (res:any )=> {
        location.reload(true);
      },
      error => {
        this.errores=[]
        this.errores.push(error.error.message)
        this.modalService.open(this.modalFracaso,{centered:true});
        
      })
      */    
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
      this.eventos=[]

      for(var i=0; i< this.tablaOriginal.length; i++){
        if(this.tablaOriginal[i][0]==event.target.value ||
          this.eliminarDiacriticos(this.tablaOriginal[i][1]).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0 || 
          this.eliminarDiacriticos(this.tablaOriginal[i][2]).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0 || 
          this.eliminarDiacriticos(this.tablaOriginal[i][3]).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0 ||
          this.eliminarDiacriticos(this.tablaOriginal[i][4]).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0||
          this.eliminarDiacriticos(this.tablaOriginal[i][5]).toLowerCase().indexOf(this.eliminarDiacriticos(event.target.value).toLowerCase())>=0)
          this.eventos.push(this.tablaOriginal[i])
      }
    }
    if (event.target.value.length == 0) {
      this.eventos=this.tablaOriginal;
    }
  }

  eliminarDiacriticos(texto) {
    if(texto!=null)
      return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    else
      return "";
  }


}
