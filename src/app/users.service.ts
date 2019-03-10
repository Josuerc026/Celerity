import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private apiURL = 'http://localhost:5000/user';
  // private apiURL = 'https://celerity-dash.herokuapp.com/user';
  // private apiURL = 'https://calcar.serveo.net/user';
  private apiURL = 'https://archa.serveo.net/user';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(user: object): Observable<any>{
    const request = this.apiURL + `/login`;

    return this.http.post(request, user, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  logout(): Observable<any>{
    const request = this.apiURL + '/logout';
    return this.http.post(request, null, {
      withCredentials: true
    });
  }
}
