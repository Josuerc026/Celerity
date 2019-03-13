import { Component, OnInit } from '@angular/core';
import { ChallengesService } from '../challenges.service';
import { FriendsService } from '../friends.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  challenges: object[];
  singleChallenge: object;
  singleFriend: any;
  closeResult: string;
  friends: any = null;

  goal: string;
  end_date: string;
  amount: string;
  newChallenge: object = {};

  constructor(
    private challengesService: ChallengesService,
    private friendsService: FriendsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllChallenges();
  }
  
  createChallenge() : void {

    this.newChallenge['goal'] = this.goal;
    this.newChallenge['end_date'] = this.end_date;
    this.newChallenge['amount'] = this.amount.toString();

    this.challengesService.createChallenge(this.newChallenge).subscribe(confirmation => {
      console.log('CREATION:', confirmation);
      this.getAllChallenges();
      this.modalService.dismissAll();
    });
  }

  getAllChallenges(): void {
    this.challengesService.getAllChallenges().subscribe(challenges => {
      console.log(challenges);
      this.challenges = challenges;
      this.singleChallenge = challenges[0];
      this.getOneFriend(challenges[0].friend, (err, friend) => {
        if(!err){
          this.singleFriend = friend;
        }else{
          this.singleFriend = null;
        }
      });
    });
  }

  getFriends(): void {
    this.friendsService.getFriends().subscribe(friends => {
      console.log(friends);
      this.friends = friends;
    });
  }

  getOneFriend(friend_id: string, cb): void {
    this.friendsService.getOneFriend(friend_id).subscribe(friend => {
      console.log(friend);
      let err = null;
      let data = null;
      if(friend.status == 'error'){
          err = friend.data;
      }
      if(friend.status == 'success'){
        data = friend.data;
      }
      if(cb){
        cb(err, data);
      }
    });
  }

  selectFriend(friend: any){
    this.newChallenge['friend'] = friend.id;
    console.log(this.newChallenge);
  }

  selectSingleChallenge(challenge: any): void {
    this.singleChallenge = challenge;
    this.getOneFriend(challenge.friend, (err, friend) => {
      if(!err){
        this.singleFriend = friend;
      }else{
        this.singleFriend = null;
      }
    });
  }

  //////////// UTILITY METHODS ////////////////

  daysToComplete(endDate: string): number {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const days = (((((end - now)/1000)/60)/60)/24); //days

    return days;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getFriends();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
