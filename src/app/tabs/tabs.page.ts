import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	public appPages = [
	    {
	      title: '¿Quienes somos?',
	      url: '/tabs/quienes-somos',
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
	      url: '/tabs/eventos',
	      icon: 'calendar'
	  	},
	    {
	      title: 'Contactanos',
	      url: '/tabs/contactanos',
	      icon: 'phone-portrait'
	  	},
	    {
	      title: 'Usuario',
	      url: '/tabs/usuario',
	      icon: 'person'
	    },
	    {
	      title: 'Gestionar evento(s)',
	      url: '/tabs/eventos',
	      icon: 'calendar'
	  	},
	    {
	      title: 'Entrar',
	      url: '/tabs/login',
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

