import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-estadisticas',
  templateUrl: './dashboard-estadisticas.page.html',
  styleUrls: ['./dashboard-estadisticas.page.scss'],
})
export class dashboardEstadisticasPage implements OnInit {

  @ViewChild("modalExito", {static:true}) modalExito: ElementRef; 
  @ViewChild("modalConfirmarEnviar", {static:true}) modalConfirmarEnviar: ElementRef; 
  
  @ViewChild('graficaPorMes', { static: false }) BarrasgraficaPorMes!: ElementRef<HTMLCanvasElement>;
  graficaPorMes!: Chart;

  @ViewChild('graficaPorDispositivo', { static: false }) BarrasgraficaPorDispositivo!: ElementRef<HTMLCanvasElement>;
  graficaPorDispositivo!: Chart;
  
  @ViewChild('graficaPorModulo', { static: false }) BarrasgraficaPorModulo!: ElementRef<HTMLCanvasElement>;
  graficaPorModulo!: Chart;
  
  @ViewChild('graficaPorMesDispositivo', { static: false }) BarrasgraficaPorMesDispositivo!: ElementRef<HTMLCanvasElement>;
  graficaPorMesDispositivo!: Chart;
  
  @ViewChild('graficaPorMesModulo', { static: false }) BarrasgraficaPorMesModulo!: ElementRef<HTMLCanvasElement>;
  graficaPorMesModulo!: Chart;

  @ViewChild('graficaPorAño', { static: false }) BarrasgraficaPorAño!: ElementRef<HTMLCanvasElement>;
  graficaPorAño!: Chart;

  constructor( public menuCtrl: MenuController , private  authService:  AuthService, private httpClient:HttpClient, private modalService: NgbModal) 
  {
  }
  prueba:any;
  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

  SERVER_ADDRESS:  string  =  'https://manos-que-dejan-huella.herokuapp.com';

  backgroundColorsito = [ '#dc6900', '#ffb600', '#a32020',"#ABA591","#D62E1C",'#602320', "#FFCF48", "#EB8C00","#CBC6B7","#736B53","#F7D5D5","#E16767","#602320","#F09B92","#3D0C0C","#857C60","#FFC571","#B23F02","#FEB791","#933401","#FFB600","#A37400","#E2AAA7","#AA2417","#CF736E","#741910","#CBC6B7","#615A46","#D04A02","#FD9359","#752A01","#FFDCA9","#EB8C00","#FFC83D","#0A4E7B","#B6CAD7","#05355E","#85A7BD","#094773","#B4AD97","#634A8F","#D0C9DD","#473272","#B1A5C7","#855F00","#E0A000","#66BB6A","#D1EBD2","#38963C","#B3DDB5","#714300","#CC7A00","#D93954","#FDD7DE","#7F182D","#EEA8B6","#491B18","#C14A44"]; 


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

  ngAfterViewInit() {
    this.llenadoGraficaMes();
    this.llenadoGraficaDispositivo();
    this.llenadoGraficaModulo();
    this.llenadoGraficaMesDispositivo();
    this.llenadoGraficaMesModulo();
    this.llenadoGraficaAño();
  }


  public chartOptions:any = {   
    scaleShowVerticalLines: false,    
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true          
        }
      }]
    },
    scaleShowHorizontalLines: false,
    legend : { display: false, position: 'bottom' },
  } 
  public chartOptions2:any = {   
    scaleShowVerticalLines: false, 
    scaleShowHorizontalLines: false, 
    legend : { display: false, position: 'bottom' },
  }



  public chartOptions3:any = {   
    scaleShowVerticalLines: false, 
    scaleShowHorizontalLines: false, 
    scales:{
      yAxes:[{
        stacked:true,
        ticks:{
          beginAtZero: true          
        }
      }],
      xAxes:[{
        stacked:true,
        ticks:{
          fontSize:10,
          maxRotation:0,
          beginAtZero: true          
        }
      }]
    },  
    legend : { display: false, position: 'bottom' },
  }


  public llenadoGraficaMes()
  {
    this.httpClient.get(`${this.SERVER_ADDRESS}/dashboardEstadisticas/graficaMes` ).subscribe(
      (res:any)=>{

        if((res!= null) && (res[0] != null)){
          var cantidadVisitas=[]
          var mes = []
          for(var i=0; i< res.length; i++)
          {
            if(res[i].mes == '-'){ res[i].mes  = 'Sin datos'}

              cantidadVisitas.push(res[i].cantidad);
            mes.push(res[i].mes);
          }

          setTimeout(()=>{
            this.graficaPorMes= new Chart(this.BarrasgraficaPorMes.nativeElement, {
              type: 'bar',
              data: {
                labels: mes,
                datasets: [

                { data: cantidadVisitas, label: 'Visitas' , backgroundColor: this.backgroundColorsito,},

                ],
              },
              options:this.chartOptions,
            });
          },500)
        }
      })

  }


  public llenadoGraficaDispositivo()
  {
    this.httpClient.get(`${this.SERVER_ADDRESS}/dashboardEstadisticas/graficaDispositivo` ).subscribe(
      (res:any)=>{

        if((res!= null) && (res[0] != null)){
          var cantidadVisitas=[]
          var dispositivo = []
          for(var i=0; i< res.length; i++)
          {
            if(res[i].dispositivo == '-'){ res[i].dispositivo  = 'Sin datos'}

              cantidadVisitas.push(res[i].cantidad);
            dispositivo.push(res[i].dispositivo);
          }

          setTimeout(()=>{
            this.graficaPorDispositivo= new Chart(this.BarrasgraficaPorDispositivo.nativeElement, {
              type: 'pie',
              data: {
                labels: dispositivo,
                datasets: [

                { data: cantidadVisitas, label: 'Visitas' , backgroundColor: this.backgroundColorsito,},

                ],
              },
              options:this.chartOptions2,
            });
          },500)
        }
      })

  }



  public llenadoGraficaModulo()
  {
    this.httpClient.get(`${this.SERVER_ADDRESS}/dashboardEstadisticas/graficaModulo` ).subscribe(
      (res:any)=>{

        if((res!= null) && (res[0] != null)){
          var cantidadVisitas=[]
          var modulo = []
          for(var i=0; i< res.length; i++)
          {
            if(res[i].modulo == '-'){ res[i].modulo  = 'Sin datos'}

              cantidadVisitas.push(res[i].cantidad);
            modulo.push(res[i].modulo);
          }

          setTimeout(()=>{
            this.graficaPorModulo= new Chart(this.BarrasgraficaPorModulo.nativeElement, {
              type: 'bar',
              data: {
                labels: modulo,
                datasets: [

                { data: cantidadVisitas, label: 'Visitas' , backgroundColor: this.backgroundColorsito,},

                ],
              },
              options:this.chartOptions,
            });
          },500)
        }
      })

  }

  public llenadoGraficaMesModulo()
  {
    this.httpClient.get(`${this.SERVER_ADDRESS}/dashboardEstadisticas/graficaMesModulo` ).subscribe(
      (res:any)=>{

        if((res!= null) && (res[0] != null)){
          var mes = []
          var contactanos=[]
          var publicaciones=[]
          var quienesSomos=[]
          var usuario=[]
          var login=[]
          var home=[]


          for(var i=0; i< res.length; i++)
          {
            if(res[i].mes == '-'){ res[i].mes  = 'Sin datos'}

              if(res[i].modulo=='Contactanos')
                contactanos.push(res[i].cantidad);
              else
                if(res[i].modulo=='Publicaciones')
                  publicaciones.push(res[i].cantidad);
                else
                  if(res[i].modulo=='Usuario')
                    usuario.push(res[i].cantidad);
                  else
                    if(res[i].modulo=='QuienesSomos')
                      quienesSomos.push(res[i].cantidad);
                    else
                      if(res[i].modulo=='Login')
                        login.push(res[i].cantidad);
                      else
                        if(res[i].modulo=='Home')
                          home.push(res[i].cantidad);

                        if(mes.indexOf(res[i].mes)<0)
                          mes.push(res[i].mes);
                      }

                      setTimeout(()=>{
                        this.graficaPorMesModulo= new Chart(this.BarrasgraficaPorMesModulo.nativeElement, {
                          type: 'bar',
                          data: {
                            labels: mes,
                            datasets: [

                            { data: quienesSomos, label: 'Visitas en quienes somos' , backgroundColor:['#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900'],},

                            { data: usuario, label: 'Visitas en usuario' , backgroundColor:['#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600'],},

                            { data: publicaciones, label: 'Visitas en publicaciones' , backgroundColor:['#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020'],},

                            { data: contactanos, label: 'Visitas en contactanos' , backgroundColor:["#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591"],},

                            { data: login, label: 'Visitas en login' , backgroundColor:["#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C","#D62E1C"],},

                            { data: home, label: 'Visitas en home' , backgroundColor:['#602320','#602320','#602320','#602320','#602320','#602320','#602320','#602320','#602320','#602320','#602320','#602320'],},

                            ],
                          },
                          options:this.chartOptions3,
                        });
                      },500)
                    }
                  })

  }

  public llenadoGraficaMesDispositivo()
  {
    this.httpClient.get(`${this.SERVER_ADDRESS}/dashboardEstadisticas/graficaMesDispositivo` ).subscribe(
      (res:any)=>{

        if((res!= null) && (res[0] != null)){
          var mes = []
          var android=[]
          var mobileweb=[]
          var mobile=[]
          var desktop=[]

          for(var i=0; i< res.length; i++)
          {
            if(res[i].mes == '-'){ res[i].mes  = 'Sin datos'}

              if(res[i].dispositivo=='android')
                android.push(res[i].cantidad);
              else
                if(res[i].dispositivo=='mobileweb')
                  mobileweb.push(res[i].cantidad);
                else
                  if(res[i].dispositivo=='mobile')
                    mobile.push(res[i].cantidad);
                  else
                    if(res[i].dispositivo=='desktop')
                      desktop.push(res[i].cantidad);


                    if(mes.indexOf(res[i].mes)<0)
                      mes.push(res[i].mes);
                  }

                  setTimeout(()=>{
                    this.graficaPorMesDispositivo= new Chart(this.BarrasgraficaPorMesDispositivo.nativeElement, {
                      type: 'bar',
                      data: {
                        labels: mes,
                        datasets: [

                        { data: android, label: 'Visitas android' , backgroundColor:['#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020','#a32020'],},

                        { data: mobileweb, label: 'Visitas mobileweb' , backgroundColor:['#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900','#dc6900'],},

                        { data: mobile, label: 'Visitas mobile' , backgroundColor:['#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600','#ffb600'],},

                        { data: desktop, label: 'Visitas desktop' , backgroundColor:["#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591","#ABA591"],},

                        ],
                      },
                      options:this.chartOptions3,
                    });
                  },500)
                }
              })

  }

  public llenadoGraficaAño()
  {
    this.httpClient.get(`${this.SERVER_ADDRESS}/dashboardEstadisticas/graficaYear` ).subscribe(
      (res:any)=>{

        if((res!= null) && (res[0] != null)){
          var cantidadVisitas=[]
          var año = []
          for(var i=0; i< res.length; i++)
          {
            if(res[i].año == '-'){ res[i].año  = 'Sin datos'}

              cantidadVisitas.push(res[i].cantidad);
            año.push(res[i].año);
          }

          setTimeout(()=>{
            this.graficaPorAño= new Chart(this.BarrasgraficaPorAño.nativeElement, {
              type: 'bar',
              data: {
                labels: año,
                datasets: [

                { data: cantidadVisitas, label: 'Visitas' , backgroundColor: this.backgroundColorsito,},

                ],
              },
              options:this.chartOptions,
            });
          },500)
        }
      })

  }


}
