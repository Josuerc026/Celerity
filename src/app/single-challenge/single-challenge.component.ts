import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChallengesService } from '../challenges.service';

@Component({
  selector: 'app-single-challenge',
  templateUrl: './single-challenge.component.html',
  styleUrls: ['./single-challenge.component.scss']
})
export class SingleChallengeComponent implements OnInit {

  @Input() challenge: any = null;
  @Input() friend: any = null;
  @Output() deleted = new EventEmitter<boolean>();

  constructor(
    private challengeService: ChallengesService
  ) { }

  ngOnInit() {
  }

  delete(): void {
    if(this.challenge.hasOwnProperty('_id')){
      let id: string = this.challenge._id;

      this.challengeService.deleteChallenge(id)
        .subscribe(confirmation => {
          console.log(confirmation);
          this.deleted.emit(true);
        });
    }
  }

}
