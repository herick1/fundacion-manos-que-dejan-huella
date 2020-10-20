import { Component,OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SwPush} from '@angular/service-worker';
import {NewsletterService} from './services/newsletter.service'
import { HttpClient} from  '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  readonly VAPID_PUBLIC_KEY = "BGpXrs5JMCp12-ZnyswX3fQyHttIdhwpy-BJGg8Uc-muLZORf82aPO1UBeRemcK_7thNFxIcDkjS3melYigx2wE"
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private  httpClient:  HttpClient
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.subscribeToNotifications()
  }

  AUTH_SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';
  

  ngOnInit() {
    this.EnviarTranzabilidad();
  /*
    console.log("entre 1")
        this.subscribeToNotifications();
        */

      }

      subscribeToNotifications() {
        if(this.newsletterService.usado==false){
          this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
          })
          .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
          .catch(err => console.error("Could not subscribe to notifications", err));
        }
      }

      EnviarTranzabilidad(){ 
        if (this.platform.is('ios')) {
          this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/ios`).subscribe( 
            //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
            (response: any)=>{    
              console.log(response)
            }
            );
          // This will only print when on iOS
          console.log('I am an iOS device!');
        }
        if (this.platform.is('android')) {
          this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/android`).subscribe( 
            //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
            (response: any)=>{    
              console.log(response)
            }
            );
          // This will only print when on iOS
          console.log('I am an android device!');
        }
        if (this.platform.is('mobileweb')) {
          this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/mobileweb`).subscribe( 
            //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
            (response: any)=>{    
              console.log(response)
            }
            );
          // This will only print when on iOS
          console.log('I am a mobileweb device!');
        }
        if (this.platform.is('desktop')) {
          this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/desktop`).subscribe( 
            //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
            (response: any)=>{    
              console.log(response)
            }
            );
          // This will only print when on iOS
          console.log('I am a desktop device!');
        }
        
        if (this.platform.is('cordova')) {
          this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/cordova`).subscribe( 
            //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
            (response: any)=>{    
              console.log(response)
            }
            );
          // This will only print when on iOS
          console.log('I am a desktop device!');
        }
        
        if (this.platform.is('mobile')) {
          this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/mobile`).subscribe( 
            //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
            (response: any)=>{    
              console.log(response)
            }
            );
          // This will only print when on iOS
          console.log('I am a desktop device!');
        }
      }

    }
