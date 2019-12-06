import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-no-found',
  templateUrl: './no-found.page.html',
  styleUrls: ['./no-found.page.scss'],
})
export class NoFoundPage implements OnInit {
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
