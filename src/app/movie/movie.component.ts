import { Component, OnInit, Input} from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})

export class MovieComponent implements OnInit {

  @Input() movie: any;
  movieDetails: any;
  time: any = null;
  timerID: any;
  loggedIn: boolean;
  user: object;
  
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    //If movie results are present and have properties, don't call movieById
    if(this.movie){
      this.initCountdown(this.movie.release);
      return;
    } 
    this.getMovieById();

    this.authService.authState.subscribe((user) =>{
      this.user = user;
      this.loggedIn = (user != null);
      if(!this.loggedIn){
        this.router.navigate(['/login']);
      }
    })
  }

  signOut(signedOut: boolean): void {
    if(!signedOut) return;
    this.authService.signOut();
  }

  getMovieById(): void { 
      const id = +this.route.snapshot.paramMap.get('id');
      this.movieService.getMovieById(id)
      .subscribe((movie) => {
        let release_date = movie.releases.countries.find(country => country.iso_3166_1 === 'US').release_date;

        this.movieDetails = {
          title: movie.title,
          description: movie.overview,
          release: release_date,
          backdrop_path: movie.backdrop_path
        };
        this.timerID = this.initCountdown(release_date);
      });
  }

  initCountdown(date: string): void{
    if(!date) return;
    this.timerID = setInterval(() => { 
      this.countdownController(date);
    }, 1000);
  }

  countdownController(date: string) : void {
    let countdown: any = this.timeToRelease(date);
    if(countdown.d > 0){
      this.time = countdown;
    }else{
      this.time = null;
      clearInterval(this.timerID);
    }
  }

  timeToRelease(date: string): object{
    let now: any = new Date();
    let releaseDateArr = date.split('-');
    let releaseDate: any = new Date(`${releaseDateArr[1]}/${releaseDateArr[2]}/${releaseDateArr[0]} EST`);

    now = now.getTime();
    releaseDate = releaseDate.getTime();

    const days = (((((releaseDate- now)/1000)/60)/60)/24); //days
    const hrs = ((((releaseDate - now)/1000)/60)/60)%24; //hrs
    const min = (((releaseDate - now)/1000)/60)%60; // minutes
    const sec = ((releaseDate - now/1000))%60;//seconds

    return {
      d: Math.floor(days),
      h: Math.floor(hrs),
      m: Math.floor(min),
      s: Math.floor(sec)
    }
  }
}
