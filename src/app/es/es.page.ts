import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-es',
  templateUrl: 'es.page.html',
  styleUrls: ['es.page.scss']
})
export class EsPage {
valor:string
	constructor( public menuCtrl: MenuController, private  authService:  AuthService) 
	{
		this.authService.storage.get("ACCESS_TOKEN").then(
			(res:any)=>{
			  if(res){
				this.appPages[5].title='Salir'
			this.appPages[5].onEnter=function(){
				this.authService.logout() 
				this.authService.storage.get("ACCESS_TOKEN").then(
				  (res:any)=>{
					if(res)
					this.prueba=true
				  else
					this.prueba=false
				  })
			}
			}
			else
				this.appPages[5].title='Entrar'
			})
			
		
	}
  
	public appPages = [
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
	      title: 'Eventos',
	      url: '/es/no-found',
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
	      title: 'Gestionar usuario(s)',
	      url: '/es/usuario',
	      icon: 'calendar'
		  },
		  {
			title: this.valor,
			url: '/es/login',
			icon: 'log-in',
			onEnter: function(){
                
			
			}
		}
	   
	  ];


toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

}

