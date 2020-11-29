import { Component, OnInit,AfterViewInit } from '@angular/core';
import { MenuController, Platform  } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { TranzabilidadService } from '../services/tranzabilidad.service';
import { Router } from  "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef,} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient , HttpHeaders} from  '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class HomePage implements OnInit {

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }


  nextSlide(slides: IonSlides) {
    slides.isEnd().then(data => {
      if(data==true) slides.slideTo(0);
    })
    slides.slideNext();
    setTimeout(() => {slides.startAutoplay(), 800});
  }

  prevSlide(slides: IonSlides) {
    let tamaño;      
    slides.length().then(data => {
      tamaño= data;
    })
    slides.isBeginning().then(data => {
      if(data==true) slides.slideTo(tamaño-1);
    })
    slides.slidePrev();
    setTimeout(() => {slides.startAutoplay(), 800});
  }

  public sliderEvento: Array<any> = [];
  public slidershome: Array<any> = [];
  prueba:any;
  SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';
  //SERVER_ADDRESS:  string  =  'http://localhost:5000';



  constructor(private platform: Platform, public menuCtrl: MenuController,private activatedRoute: ActivatedRoute, 
    private  httpClient:  HttpClient, private modalService: NgbModal, private  authService:  AuthService,
    private  router:  Router, private tranzabilidadService:TranzabilidadService, private cdRef:ChangeDetectorRef) 
  {
    //maneja el evento al iniciar sesion para actualizar el menu en home
    this.authService.changeEmitted$.subscribe(
      text => {
        if(text=='login'){
          this.prueba=true;
        }
        else{
          this.prueba=false;
        }
        this.cdRef.detectChanges();
      });
    if (this.platform.is('cordova')){
      this.slidershome.push(
      {
        imagePath: 'assets/img/fundacion-areasIntervencion.png',
        href: "/es/home#",
        label: '¿Cuales son nuestras areas de Intervención?',
        text:
        'Siempre tratando de ayudar y crecer a nuestra Venezuela'
      },
      {
        imagePath: 'assets/gif/gif-phone.gif',
        href:"/es/home#",
        label: '¿Sabias de nuestra app Movil?',
        text: 'Utilizala para estar conectado a nosotros en todo momento.'
      },
      {
        imagePath: 'assets/img/fundacion-mundo.png',
        href: "/es/home#",
        label: '¿Tienes un donativo o quieres ayudarnos?',
        text:
        'Tú ayuda es importante! comunicate con nosostros a manosquedejanhuellas@gmail.com'
      }
      );

    }
    else{
      this.slidershome.push(
      {
        imagePath: 'assets/img/fundacion-areasIntervencion.png',
        href: "/es/home#",
        label: '¿Cuales son nuestras areas de Intervención?',
        text:
        'Siempre tratando de ayudar y crecer a nuestra Venezuela'
      },
      {
        imagePath: 'assets/gif/gif-phone.gif',
        href:"/download?ngsw-bypass=true",
        label: '¿Sabias de nuestra app Movil?',
        text: 'Utilizala para estar conectado a nosotros en todo momento.'
      },
      {
        imagePath: 'assets/img/fundacion-mundo.png',
        href: "/es/home#",
        label: '¿Tienes un donativo o quieres ayudarnos?',
        text:
        'Tú ayuda es importante! comunicate con nosostros a manosquedejanhuellas@gmail.com'
      }
      );

    }

}

toggleMenu() {
  this.menuCtrl.toggle(); //Add this method to your button click function
}
ngOnInit() {

    this.httpClient.get(`${this.SERVER_ADDRESS}/evento/imagenes`).subscribe( 
      //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
      (response: any)=>{    
        for(var i=0; i< response.length; i++)
        {
          this.sliderEvento.push(
          {
            imagePath:response[i].url,
            label:response[i].nombre,
            text:response[i].descripcion,
          })
        }
      })
}

ngAfterViewInit(){
  this.tranzabilidadService.EnviarTranzabilidad("Home")
  this.authService.storage.get("LOGIN_ESTATUS").then(
    (res:any)=>{
      if(res==true)
        this.prueba=true
      else
        this.prueba=false
    })
}


logout(){
  this.authService.logout().then(
    (res:any)=>{
      if(res)
        this.prueba=true
      else
        this.prueba=false
    })  
}



}


