import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiURL = 'https://dev.celerity.com:5000/notifications';

  constructor(
    private http: HttpClient,
  ) {}
  getNotifications(): Observable<any>{
    const request = this.apiURL + '/all';
    return this.http.get(request,{
      withCredentials: true
    });
  }
  getNotificationsByUser(): Observable<any>{
    const request = this.apiURL + '/user-notifications';
    return this.http.get(request,{
      withCredentials: true
    });
  }
}
