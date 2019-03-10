import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-challenge',
  templateUrl: './single-challenge.component.html',
  styleUrls: ['./single-challenge.component.scss']
})
export class SingleChallengeComponent implements OnInit {

  @Input() challenge: object = null;
  @Input() friend: any = null;

  constructor() { }

  ngOnInit() {
  }

}
