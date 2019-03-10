import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavigationComponent implements OnInit {

  @Input() user: object;
  @Output() signedOut = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    config: NgbDropdownConfig
  ) {
    config.placement = 'bottom-right';
   }

  ngOnInit() {
  }

  signOut(e: boolean): void {
    this.signedOut.emit(e);
  }
}
