import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL: string = "heroesURL";
  heroeURL: string = "heroeURL";

  constructor( private http:HttpClient ) { }

  nuevoHeroe(heroe:Heroe){
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(this.heroesURL, body, {headers:headers})
            .pipe(
              map( (res)=>{
                console.log(res);
                return res;
              })
            )
  }


  actualizarHeroe(heroe:Heroe, key$:string){
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    let url = `${this.heroeURL}/${key$}.json`;

    return this.http.put(url, body, {headers:headers})
            .pipe(
              map( (res)=>{
                console.log(res);
                return res;
              })
            )
  }


  getHeroe(key$:string){
    let url = `${this.heroeURL}/${key$}.json`;
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get(url, {headers:headers})
            .pipe(
              map((res)=>{
                return res;
              })
            )
  };

  getHeroes(){
    return this.http.get(this.heroesURL)
              .pipe(
                map((res)=>{
                  return res;
                })
              )
  }

  borrarHeroe(key$:string){
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(url)
            .pipe(
              map((res)=>{
                return res;
              })
            )
  }



}
