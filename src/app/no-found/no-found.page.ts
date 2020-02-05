import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-no-found',
  templateUrl: './no-found.page.html',
  styleUrls: ['./no-found.page.scss'],
})
export class NoFoundPage implements OnInit {
  focus:any;
  focus1:any;
  prueba:any;
  constructor( public menuCtrl: MenuController, private  authService:  AuthService) 
  {
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
    this.authService.storage.get("ACCESS_TOKEN").then(
      (res:any)=>{
        if(res)
        this.prueba=true
      else
        this.prueba=false
      })
  }

  logout(){
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

