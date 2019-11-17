import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  constructor(private http: HttpClient) {  
  }
  pruebas=[]

  ngOnInit(
    ) {
     this.getPrueba();
    }

  getPrueba() {
      this.http.get("https://manos-que-dejan-huella.herokuapp.com/jugador").subscribe( 
        //TODO esto te devulve todos los jugadores hacer uno que te duvuelva solo un jugador /jugador
        (response: any)=>{    
          console.log(response)
          if(response)
          this.pruebas = response;
          else this.pruebas=["aaaa"]
        }
      );
  }

  
}
