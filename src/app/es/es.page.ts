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
	      	{ title: 'Mision', url: '' },
	      	{ title: 'Vision', url: '' },
	      	{ title: 'Valores', url: '' },
	      	{ title: 'Historia', url: '' },
	      	{ title: 'Objetivo General', url: '' },
	      	{ title: 'Objetivos Especificos', url: '' }
	      ]
	    },
	    {
	      title: 'Eventos',
	      url: '/es/eventos',
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
	      url: '/es/eventos',
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

