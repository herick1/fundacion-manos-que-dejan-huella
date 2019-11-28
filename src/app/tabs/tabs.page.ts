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
	      title: 'Card',
	      url: '/home',
	      icon: 'paper'
	    },
	    {
	      title: 'Category',
	      url: '/list',
	      icon: 'walk',
	      subPages: [{ title: 'subtest1', url: '' },
	      { title: 'subtest2', url: '' },
	      { title: 'subtest3', url: '' },
	      { title: 'subtest4', url: '' },
	      { title: 'subtest5', url: '' },
	      { title: 'subtest6', url: '' },
	      { title: 'subtest7', url: '' },
	      { title: 'subtest8', url: '' }]
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

