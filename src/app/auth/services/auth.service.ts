import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public validatorEmailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  private api: string = environment.api;
  private _user!: User;

  get user(){
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string){

    const endPoint = `${this.api}/auth`;
    const body = {email, password}

    return this.http.post<AuthResponse>(endPoint, body).pipe(
      tap( resp => {
        if ( resp.ok ) {
          localStorage.setItem('token', resp.token! );
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );

  }

  validarToken(): Observable<boolean>{

    const endPoint = `${this.api}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(endPoint, {headers}).pipe(
      map( res => {
        localStorage.setItem('token', res.token! );
        this._user = {
          name: res.name!,
          uid: res.uid!,
          email: res.email!
        }
        return res.ok
      }),
      catchError(err => of(false))
    );

  }

  logOut(){
    localStorage.removeItem('token');
  }

  registro(payload: User){
    const enpoint = `${this.api}/auth/new`;
    return this.http.post<AuthResponse>(enpoint, payload).pipe(
      tap(res => {
        if (res.ok) {
          localStorage.setItem('token', res.token!);
        }
      }),
      map(res=> {
        return res.ok
      }),
      catchError(err => of(err.error.msg))
    )
  }

}
