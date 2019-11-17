import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private http: HttpClient) {  
  }
  pruebas=[]

  getprueba() {
      this.http.get("https://manos-que-dejan-huella.herokuapp.com/jugador").subscribe( 
        //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
        (response: any)=>{    
          console.log(response)
          this.pruebas = response;
        }
      );
  }

  
}
