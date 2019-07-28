import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MovieComponent } from '../movie/movie.component';
import { LoginComponent } from '../login/login.component';
import { MoviesService } from '../movies.service';
import { AuthService } from "angularx-social-login";
import { UsersService } from "../users.service";
import { GoogleLoginProvider } from "angularx-social-login";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbTabChangeEvent, NgbTabset } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('t') tabs:NgbTabset;
  movies = [];
  movie: any;
  movieQuery: string;
  greeting: string = "Hello";
  user: object;
  loggedIn: boolean;

  constructor(
    private movieService: MoviesService,
    private authService: AuthService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getTimeOfDay();

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   console.log('AUTHSTATE');
    //   this.loggedIn = (user != null);
    //   if(!this.loggedIn){
    //     this.router.navigate(['/login']);
    //   }
    // });

    this.userService.authState().subscribe((res) => {
      console.log('RESPONSE', res);
      if(!res) return;
      let user = JSON.parse(res);
      if(user){
        this.user = user;
      }
    });
  }

  signOut(signedOut: boolean): void {
    if(!signedOut) return;

    this.userService.logout().subscribe(confirmation => {
      console.log(confirmation);
      this.router.navigate(['/login']);
    });
    this.authService.authState.subscribe((user) => {
      if(user != null){
        this.authService.signOut();
      }
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

  tabRouting(event: NgbTabChangeEvent){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { tab: event.nextId.split('tab-').pop() }, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
}
