import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {
  focus:any;
  focus1:any;
  constructor( public menuCtrl: MenuController) 
  {
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
  }

}
