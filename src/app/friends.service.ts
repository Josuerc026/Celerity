import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private apiURL = 'https://dev.celerity.com:5000/friends';

  constructor(private http: HttpClient) { }

  addFriend(id: string): Observable<any>{
    const request = this.apiURL + '/save/' + id;
    return this.http.post(request, null, {
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

  findFriends(query: string): Observable<any>{
    const request = this.apiURL + '/find/' + query;
    return this.http.get<any>(request, {
      withCredentials: true
    });
  }
}