import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  key = '?api_key=4650b6df4cd0d7388c64bd5a0823a95d';
  responseAddition = 'releases';
  private apiURL = `https://api.themoviedb.org/4/search/movie`;
  private apiURLID = `https://api.themoviedb.org/3/movie`;

  constructor(
    private http: HttpClient
  ) { }

  getMovie(query: string) : Observable<any>{
    const request = this.apiURL + this.key + `&query=${query}&append_to_response=${this.responseAddition}`;
    return this.http.get<any>(request);
  }
  getMovieById(id: number) : Observable<any>{
    const request = this.apiURLID + `/${id}` + this.key + `&append_to_response=${this.responseAddition}`;
    return this.http.get<any>(request);
  }
}
