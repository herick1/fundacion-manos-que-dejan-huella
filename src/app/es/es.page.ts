import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-es',
	templateUrl: 'es.page.html',
	styleUrls: ['es.page.scss']
})
export class EsPage implements OnInit {
	valor:string
  constructor( public menuCtrl: MenuController, private  authService:  AuthService) 
  {

    this.authService.changeEmitted$.subscribe(
      text => {
        //agregar la parte de usuario aca (push)
        //let temporal=this.appPages.slice(0,3)
        //let temporal2=this.appPages.splice(3,2)
        this.appPages=[]
        this.appPages=this.conUsuario;
      });


  }
  public appPages = [ ]

  conUsuario=[
  {
    title: '¿Quienes somos?',
    url: '/es/quienes-somos',
    icon: 'people',
    subPages: [
    { title: 'Misión', url: '/es/quienes-somos#mision'  },
    { title: 'Visión', url: '/es/quienes-somos#vision' },
    { title: 'Valores', url: '/es/quienes-somos#valores' },
    { title: 'Historia', url: '/es/quienes-somos#historia' },
    { title: 'Objetivo General', url: '/es/quienes-somos#objetivos' },
    { title: 'Objetivos Especificos', url: '/es/quienes-somos#' }
    ]
  },
  {
    title: 'Publicaciones',
    url: '/es/publicaciones',
    icon: 'calendar'
  },
  {
    title: 'Contactanos',
    url: '/es/contactanos',
    icon: 'phone-portrait'
  },
  {
    title: 'Usuario',
    url: '/es/usuario',
    icon: 'person'
  },
  {
    title: 'Salir',
    url: '/es/login',
    icon: 'log-in',
    onEnter: function(){
      this.authService.logout() 
      this.authService.storage.get("LOGIN_ESTATUS").then(
        (res:any)=>{
          if(res)
            this.prueba=true
          else
            this.prueba=false
        })

    }
  }

  ];

/////////////////////////////////////////////////////////////////////////////////////////////////

sinUsuario = [
  {
    title: '¿Quienes somos?',
    url: '/es/quienes-somos',
    icon: 'people',
    subPages: [
    { title: 'Misión', url: '/es/quienes-somos#mision'  },
    { title: 'Visión', url: '/es/quienes-somos#vision' },
    { title: 'Valores', url: '/es/quienes-somos#valores' },
    { title: 'Historia', url: '/es/quienes-somos#historia' },
    { title: 'Objetivo General', url: '/es/quienes-somos#objetivos' },
    { title: 'Objetivos Especificos', url: '/es/quienes-somos#' }
    ]
  },
  {
    title: 'Publicaciones',
    url: '/es/publicaciones',
    icon: 'calendar'
  },
  {
    title: 'Contactanos',
    url: '/es/contactanos',
    icon: 'phone-portrait'
  },
  {
    title: 'Entrar',
    url: '/es/login',
    icon: 'log-in',
    onEnter: function(){
      this.authService.logout() 
      this.authService.storage.get("LOGIN_ESTATUS").then(
        (res:any)=>{
          if(res)
            this.prueba=true
          else
            this.prueba=false
        })

    }
  }

  ];






  ngOnInit() {

    this.authService.storage.get("LOGIN_ESTATUS").then(
      (res:any)=>{
        if(res==true){
          this.appPages=this.conUsuario;
        }
        else{
          this.appPages=this.sinUsuario;
        }
      })



  }
  funcionsita(titulo){
    if(titulo == "Salir"){
      this.authService.logout().then(
        (res:any)=>{
          if(res==undefined){
            this.appPages=this.sinUsuario;
            //this.appPages.slice(0,3);
            
            //}
          }

          //this.router.navigateByUrl('/es/home');
          //location.reload(true);
        });
    }

  }
  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

}

