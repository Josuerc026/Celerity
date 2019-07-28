import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'https://dev.celerity.com:5000/user';

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

  authState(): Observable<any>{
    const request = this.apiURL + `/is-logged-in`;

    return this.http.get(request, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  logout(): Observable<any>{
    const request = this.apiURL + '/logout';
    
    return this.http.post(request, null, {
      withCredentials: true,
      responseType: 'text'
    });
  }
}
