import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient} from  '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class TranzabilidadService {

	constructor(private platform: Platform, private  httpClient:  HttpClient) { }
	
	AUTH_SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';

	EnviarTranzabilidad(moduloRecibido){ 
		let body={modulo:moduloRecibido}
		if (this.platform.is('ios')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/ios`,body).subscribe( 
				//TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
				(response: any)=>{    
					console.log(response)
				}
				);
			// This will only print when on iOS
			console.log('I am an iOS device!');
		}
		if (this.platform.is('android')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/android`,body).subscribe( 
				//TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
				(response: any)=>{    
					console.log(response)
				}
				);
			// This will only print when on iOS
			console.log('I am an android device!');
		}
		if (this.platform.is('mobileweb')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/mobileweb`,body).subscribe( 
				//TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
				(response: any)=>{    
					console.log(response)
				}
				);
			// This will only print when on iOS
			console.log('I am a mobileweb device!');
		}
		if (this.platform.is('desktop')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/desktop`,body).subscribe( 
				//TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
				(response: any)=>{    
					console.log(response)
				}
				);
			// This will only print when on iOS
			console.log('I am a desktop device!');
		}

		if (this.platform.is('cordova')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/cordova`,body).subscribe( 
				//TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
				(response: any)=>{    
					console.log(response)
				}
				);
			// This will only print when on iOS
			console.log('I am a cordova device!');
		}

		if (this.platform.is('mobile')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/mobile`,body).subscribe( 
				//TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
				(response: any)=>{    
					console.log(response)
				}
				);
			// This will only print when on iOS
			console.log('I am a mobile device!');
		}
	}

}