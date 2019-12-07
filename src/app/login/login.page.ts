import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  focus:any;
  focus1:any;
  constructor( public menuCtrl: MenuController) 
  {
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  login(correo, clave){
    var campo = <HTMLInputElement> document.getElementById("campo-correo");
    var campo2 = <HTMLInputElement> document.getElementById("campo-clave");
    campo.value="";
    campo2.value="";
  }
  //campo.value = "";
  ngOnInit() {
  }
}
