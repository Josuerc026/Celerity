import { Component, OnInit, Input } from '@angular/core';
import { MovieComponent } from '../movie/movie.component';
import { LoginComponent } from '../login/login.component';
import { MoviesService } from '../movies.service';
import { AuthService } from "angularx-social-login";
import { UsersService } from "../users.service";
import { GoogleLoginProvider } from "angularx-social-login";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  movies = [];
  movie: any;
  movieQuery: string;
  greeting: string = "Hello";
  user: object;
  loggedIn: boolean;

  constructor(
    private movieService: MoviesService,
    private authService: AuthService,
    private userServive: UsersService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getTimeOfDay();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(!this.loggedIn){
        this.router.navigate(['/login']);
      }
    });
  }

  signOut(signedOut: boolean): void {
    if(!signedOut) return;
    this.authService.signOut();
    this.userServive.logout().subscribe(confirmation => {
      console.log(confirmation);
    });
  }

  getTimeOfDay() : void{

    const now = new Date();
    const hour = now.getHours();

    //Time of days and their respective min and max in 24hr time
    const timeOfDays = {
      morning: {
        min: 0,
        max: 12,
        greeting: "Good Morning"
      },
      afternoon: {
        min: 12,
        max: 18,
        greeting: "Good Afternoon"
      },
      evening: {
        min: 18,
        max: 24,
        greeting: "Good Evening"
      }
    }

    const timeOfDay = Object.entries(timeOfDays).filter((tod) => {
      const min = tod[1].min;
      const max = tod[1].max;
      if(hour >= min && hour < max){
        return tod;
      }
    });

    this.greeting = timeOfDay[0][1].greeting;
  }

  getMovie(e: any): void{
    if(e.which != 13) return;

    const query = encodeURI(this.movieQuery);
    this.movieService.getMovie(query)
    .subscribe(movie => this.movies.push({
      id: movie.results[0].id,
      title: movie.results[0].title,
      description: movie.results[0].overview,
      release: movie.results[0].release_date,
      background: movie.results[0].backdrop_path
    }));
  }

}
