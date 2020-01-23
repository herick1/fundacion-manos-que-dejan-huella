import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
 import { IonSlides } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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

  public sliders: Array<any> = [];
  public slidershome: Array<any> = [];
  prueba:any;
  constructor( public menuCtrl: MenuController, private  authService:  AuthService) 
  {
            this.sliders.push(
            {
                imagePath: 'assets/img/example-evento2.jpg',
                label: 'Proximamente evento 1',
                text:
                    'Proximamente aqui estaran los eventos destacados.'
            },
            {
                imagePath: 'assets/img/example-evento3.jpg',
                label: 'Proximamente evento 2',
                text: 'Proximamente aqui estaran los eventos destacados'
            },
            {
                imagePath: 'assets/img/example-evento1.jpg',
                label: 'Proximamento evento 3',
                text:
                    'Proximamente aqui estaran los eventos destacados'
            }
        );
        this.slidershome.push(
            {
                imagePath: 'assets/img/fundacion-areasIntervencion.png',
                href: "/es/home#",
                label: '¿Cuales son nuestras areas de Intervención?',
                text:
                    'siempre tratando de ayudar y crecer a nuestra Venezuela'
            },
            {
                imagePath: 'assets/gif/gif-phone.gif',
                href:"/download",
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

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
  this.prueba=this.authService.isLoggedIn()
  }
}


