import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient ) { }

  private api: string = environment.api;

  getHeroes(): Observable<any> {
    const endPoint = `${this.api}/heros`;
    return this.http.get<any>(endPoint);
  }

  getHeroePorId( id: string ):Observable<any> {
    const endPoint = `${this.api}/heros/${id}`;
    return this.http.get<any>(endPoint);
  }

  agregarHeroe( heroe: Heroe ): Observable<any> {
    const endPoint = `${this.api}/heros`;
    return this.http.post<Heroe>(endPoint, heroe );
  }

  editarHeroe( heroe: Heroe ): Observable<any> {
    const endPoint = `${this.api}/heros/${heroe.id}`;
    return this.http.put<any>(endPoint, heroe );
  }

  eliminarHeroe( id: string ): Observable<any> {
    const endPoint = `${this.api}/heros/${id}`;
    return this.http.delete<any>(endPoint);
  }
  
}
