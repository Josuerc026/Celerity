import { Component, OnInit } from '@angular/core';
import { ChallengesService } from '../challenges.service';
import { FriendsService } from '../friends.service';
import {NotificationsService} from '../notifications.service';
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
  editDesc: boolean = false;

  goal: string;
  end_date: {
    year: number,
    month: number,
    day: number
  };
  endDate: string;
  description: string;
  amount: string;
  newChallenge: object = {};

  constructor(
    private challengesService: ChallengesService,
    private friendsService: FriendsService,
    private notificationService: NotificationsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getChallenges();
    this.notificationService.getNotifications().subscribe(notifs => {
      console.log(notifs);
    });
    this.notificationService.getNotificationsByUser().subscribe(notifs => {
      console.log(notifs);
    });
  }

  createChallenge() : void {

    this.newChallenge['title'] = this.goal;
    this.newChallenge['description'] = this.description;
    this.newChallenge['end_date'] = this.endDate;
    this.newChallenge['amount'] = this.amount.toString();

    if ( ! this.newChallenge.hasOwnProperty('participants') )
    {
      return alert('no participant selected!');
    }

    this.challengesService.createChallenge(this.newChallenge).subscribe(confirmation => {
      console.log('CREATION:', confirmation);
      this.getChallenges();
      this.modalService.dismissAll();
    });
  }

  getChallenges(challengeId?: string): void {

    this.challengesService
      .getChallenges(challengeId)
      .subscribe( challenges => {
      console.log(challenges);
      this.challenges = challenges;
      this.singleChallenge = challenges[0];
      // this.getOneFriend(challenges[0].friend, (err, friend) => {
      //   if(!err){
      //     this.singleFriend = friend;
      //   }else{
      //     this.singleFriend = null;
      //   }
      // });
    });
  }

  onChallengeDeleted(e: any){
    console.log('DELETED STATE', e);
    if(!e) return;

    this.getChallenges();
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
    this.newChallenge['participants'] = [ friend.id ];
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

  parseDate(): void{
    if(this.end_date === null){
      return;
    }

    let { year, month, day } = this.end_date;
    this.endDate = `${month}/${day}/${year}`;
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
