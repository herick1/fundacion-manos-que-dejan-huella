import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-es',
  templateUrl: 'es.page.html',
  styleUrls: ['es.page.scss']
})
export class EsPage {
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
	      title: 'Gestionar evento(s)',
	      url: '/es/no-found',
	      icon: 'calendar'
	  	},
	    {
	      title: 'Entrar',
	      url: '/es/login',
	      icon: 'log-in'
	  	}
	  ];

  constructor( public menuCtrl: MenuController) 
  {
    //this.initializeApp();
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

}

