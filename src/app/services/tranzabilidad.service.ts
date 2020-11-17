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
				
				(response: any)=>{    
				}
				);
		}
		if (this.platform.is('android')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/android`,body).subscribe( 
				
				(response: any)=>{    
					
				}
				);
		}
		if (this.platform.is('mobileweb')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/mobileweb`,body).subscribe( 
				
				(response: any)=>{    
					
				}
				);
		}
		if (this.platform.is('desktop')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/desktop`,body).subscribe( 
				
				(response: any)=>{    
					
				}
				);
		}

		if (this.platform.is('cordova')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/cordova`,body).subscribe( 
				
				(response: any)=>{    
					
				}
				);
		}

		if (this.platform.is('mobile')) {
			this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/tranzabilidad/mobile`,body).subscribe( 
				
				(response: any)=>{    
					
				}
				);
		}
	}

}