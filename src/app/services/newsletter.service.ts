import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  SERVER_ADDRESS:  string  =  'https://dejatushuellas.com.ve';
  usado=false
  constructor(private  httpClient:  HttpClient) { 
  	
  }
      addPushSubscriber(sub:any) {
      	this.usado=true;
        return this.httpClient.post(`${this.SERVER_ADDRESS}/notificacion/suscribir/`, sub);
    }
}
