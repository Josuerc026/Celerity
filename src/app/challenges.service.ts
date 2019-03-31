import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  private apiURL = 'https://dev.celerity.com:5000/challenges';

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

  getChallenges(challengeId?: string): Observable<any>{
    const request = this.apiURL + `/` + (
      challengeId ? challengeId : ''
    );
    
    return this.http.get<any>(request, {
      withCredentials: true
    });
  }
}
