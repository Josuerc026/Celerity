import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private apiURL = 'https://dev.celerity.com:5000/friends';

  constructor(private http: HttpClient) { }

  addFriend(data: object): Observable<any>{
    const request = this.apiURL + '/save';
    return this.http.post(request, data, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  getOneFriend(friend_id: string): Observable<any>{
    const request = this.apiURL + '/find/one/' + friend_id;
    return this.http.get(request, {
      withCredentials: true
    });
  }

  getFriends(): Observable<any>{
    const request = this.apiURL + '/all';
    return this.http.get<any>(request, {
      withCredentials: true
    });
  }
}