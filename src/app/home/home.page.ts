import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( public menuCtrl: MenuController) 
  {
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
  }
}
