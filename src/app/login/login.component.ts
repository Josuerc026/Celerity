import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: object;
  loggedIn: boolean = false;
  username: string = null;
  password: string = null;
  isRegistration: boolean = false;
    
  constructor(
    private authService: AuthService,
    private usersService : UsersService,
    private router: Router
  ) { }

  registerForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      
      if(this.loggedIn) {
        this.getUser({
          firstname: user.name.split(' ')[0],
          lastname: user.name.split(' ')[1],
          avatar: user.photoUrl,
          is_google: true,
          email: user.email
        });
      }
    });
    this.usersService.authState().subscribe((res) => {
      if(!res) return;
      let user = JSON.parse(res);
      if(user){
        this.user = user;
      }
    });
  }

  getUser(user: object): void {
    this.usersService.getUser(user).subscribe((response) => {
      console.log('GET USER METHOD WHEN LOGGING IN', response);
      this.router.navigate(['/dashboard']);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithAccount(): void{
    this.getUser({
      email: this.username,
      password: this.password,
      is_google: false
    });
  }

  createAccount(): void {
    this.getUser(Object.assign({is_google: false}, this.registerForm.value));
  }

  switchPanel(event): void {
    this.isRegistration = !this.isRegistration;
  }
}
