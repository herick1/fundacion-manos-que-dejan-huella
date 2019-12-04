import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
 import { IonSlides } from '@ionic/angular';
import { ViewChild } from '@angular/core';

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
  constructor( public menuCtrl: MenuController) 
  {
            this.sliders.push(
            {
                imagePath: 'assets/img/login.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/img/login.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );
  }

toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
  }
}


