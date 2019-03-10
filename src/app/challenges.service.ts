import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  // private apiURL = 'http://localhost:5000/challenges';
  // private apiURL = 'https://celerity-dash.herokuapp.com/challenges';
  // private apiURL = 'https://calcar.serveo.net/challenges';
  private apiURL = 'https://archa.serveo.net/challenges';

  constructor(
    private http: HttpClient
  ) { }

  createChallenge(challenge: object): Observable<any>{
    const request = this.apiURL + `/create`;

    return this.http.post(request, challenge, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  getAllChallenges(): Observable<any>{
    const request = this.apiURL + `/all`;
    return this.http.get<any>(request, {
      withCredentials: true
    });
  }
}
