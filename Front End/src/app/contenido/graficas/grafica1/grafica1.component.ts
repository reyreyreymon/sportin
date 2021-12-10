import { Component, OnInit } from '@angular/core';
import { CrudproductoService } from '../../servicios/crudproducto.service';

import { ServicioGeneralService } from '../../servicios/servicio-general.service';


interface Country {
  name: string;
  value: number;
}
interface productos {
  name: string;
  value: number;
}

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
    public load: boolean = false;
    public datos: any;
    public datos2: any;
    public ordenados: productos [] = [];
    public ordenados2: productos[] = [];
    public aux:any;
    public bandera: boolean = false;
    view: [number, number] = [900, 300];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  constructor(public servicio: ServicioGeneralService, public servicio2: CrudproductoService) {
    this.servicio.mostrarTodosDetalles().subscribe((res)=>{
      this.servicio2.obtenerProductos().subscribe((respuesta)=>{
        console.log(res);
        this.datos2 = respuesta;
        this.datos = res;
        let body: productos={
          name: "lool",
          value: 0
       }
       this.ordenados.push(body)
       console.log(this.data);
         for(let dato of this.datos){
           for(let i=0; i<this.ordenados.length; i++){
             //console.log(this.ordenados[i]["nombre"])
             if(this.ordenados[i]["name"] == dato.ID_Producto){
                 this.ordenados[i]["value"] = this.ordenados[i]["value"] + dato.Cantidad;
                 this.bandera = true;
                 break;
             }else{
               this.bandera = false;
             }
           
           }
           if(this.bandera == false){
            let body: productos={
              name: dato.ID_Producto,
              value: dato.Cantidad 
           }
        this.ordenados.push(body)
           }
           this.bandera = false;
         }
         
         //this.ordenarDesc(this.ordenados, "value")
        this.ordenados.sort(function (a, b) {
          if (a.value > b.value) {
            return 1;
          }
          if (a.value < b.value) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.ordenados.reverse();
  
         
         for(let j=0; j<5; j++){
            for(let pro of this.datos2){
               if(pro._id == this.ordenados[j]["name"]){
                this.ordenados[j]["name"] = pro.Nombre;
                this.ordenados2.push(this.ordenados[j]);
               }
            }
         }
         console.log(this.ordenados2);
         this.load = true;

      });
      
    });
   }

  ngOnInit(): void {
  }
  

  
  // options
  
  private data: Country[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];


  get countryData() {
    return this.ordenados2;
  }

  

  
  get single() {
    return this.countryData;
  }

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
