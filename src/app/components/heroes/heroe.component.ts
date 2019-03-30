import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Heroe} from '../../interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre: "",
    bio:"",
    casa:"Marvel"
  }

  nuevo:boolean = false;
  id:string;

  constructor( private _heroesService: HeroesService, private _router:Router, private _activatedRoute:ActivatedRoute ) {
    this._activatedRoute.params
        .subscribe((parametros) =>{
          this.id = parametros['id'];
          if(this.id !== "nuevo"){
            this._heroesService.getHeroe(this.id)
                .subscribe((data:any)=>{
                  return this.heroe = data;
                })
          }
        })
  }

  ngOnInit() {
  }

  guardar(){
    if(this.id == "nuevo"){
      //insertando
      this._heroesService.nuevoHeroe(this.heroe)
          .subscribe((data:any) => {
            this._router.navigate(['/heroe', data.name] )
          },
          error=> console.log(error));
    }else{
      //actualizando
      this._heroesService.actualizarHeroe(this.heroe, this.id)
          .subscribe((data:any) => {
            console.log(data);
          },
          error=> console.log(error));
    }
  }


  agregarNuevo(forma:NgForm){
    this._router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa:"Marvel"
    });
  }

}
