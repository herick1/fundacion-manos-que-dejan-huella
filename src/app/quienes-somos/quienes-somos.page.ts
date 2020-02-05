import { Component, OnInit, ElementRef} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonContent } from "@ionic/angular";
import { ViewChild} from '@angular/core';
import {Router } from "@angular/router";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.page.html',
  styleUrls: ['./quienes-somos.page.scss'],
})
export class QuienesSomosPage implements OnInit { 
  prueba:any;
  @ViewChild(IonContent,  {static: false}) content: IonContent;

  @ViewChild('quieneSomos',  {static: false}) quieneSomos : ElementRef;  
  @ViewChild('mision',  {static: false}) mision : ElementRef;
  @ViewChild('valores',  {static: false}) valores : ElementRef;
  @ViewChild('vision',  {static: false}) vision : ElementRef;
  @ViewChild('objetivos',  {static: false}) objetivos : ElementRef;
  @ViewChild('historia',  {static: false}) historia : ElementRef;


  constructor(public menuCtrl: MenuController, private router: Router, private  authService:  AuthService) 
  {
  }
  buscar_fragmento(fragmento)
  {
    switch(fragmento) {
      case 'quieneSomos':
        this.content.scrollToPoint(0,this.quieneSomos.nativeElement.offsetTop, 1500);
        break;
      case 'mision':     
        this.content.scrollToPoint(0,this.mision.nativeElement.offsetTop, 1500);
        break;
      case 'valores':
        this.content.scrollToPoint(0,this.valores.nativeElement.offsetTop, 1500);
        break;
      case 'vision':
        this.content.scrollToPoint(0,this.vision.nativeElement.offsetTop, 1500);
        break;
      case 'objetivos':
        this.content.scrollToPoint(0, this.objetivos.nativeElement.offsetTop, 1500);
        break;
      case 'historia':
        this.content.scrollToPoint(0, this.historia.nativeElement.offsetTop, 1500);
        break;
      default:
        return null
    }
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


  ionViewDidEnter()
  { //la funcion mas bonita  que pude encontrar de ionic y te conoci por casualidad <3
  //esta se ejecuta cada vez que la pagina es totalmente cargadda con 
  //los DOM , router y etc, te quita los problemas dek NAvigationEnd, 
  //y siempre se ejecuta cuando la vista ya esta esta activada y probada en la el front
    const tree = this.router.parseUrl(this.router.url); //tenemso que verificar que haya un fragmento
    if (tree.fragment) { //existe un fragmento?
      this.buscar_fragmento(tree.fragment) //buscamos si existe el fragmento
    }
  }

}
