import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of, map, catchError } from 'rxjs';
import { User, Token } from '../interfaces/user.interface';
import { enviroments } from 'src/environments/environments';



@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = enviroments.baseURL;
  private token?: Token;

  constructor(private http: HttpClient) { }

  get currentUser():Token|undefined {
    if ( !this.token ) return undefined;
    return structuredClone( this.token );
  }

  login( username: string, password: string ):Observable<Token> {

    return this.http.post<Token>(`${ this.baseUrl }/services/auth/signin`,{username:username,password:password})
      .pipe(
        tap( token => console.log(token)),

        tap( token => this.token = token ),
        tap( token => localStorage.setItem('token', token.accessToken )),
      );
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of(false);
    return of(true)

    // const token = localStorage.getItem('token');
    // console.log(token)
    // return this.http.get<Token>(`${ this.baseUrl }/services/auth/signin`)
    //   .pipe(
    //     tap( token => this.token = token ),
    //     map( token => !!token ),
    //     catchError( err => of(false) )
    //   );

  }


  logout() {
    this.token = undefined;
    localStorage.clear();
  }



}
