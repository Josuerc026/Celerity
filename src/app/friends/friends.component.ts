import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends: [] = [];
  userResults: [] = [];

  constructor(
    private friendsService: FriendsService
  ) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends(): void {
    this.friendsService.getFriends().subscribe(friends => {
      console.log(friends);
      this.friends = friends;
    });
  }

  saveFriend(id: string): void {
    this.friendsService.addFriend(id).subscribe(confirmation => {
      console.log(confirmation);
      this.userResults = [];
      this.getFriends();
    });
  }

  findFriends(e): void {
    if(!e.target.value || e.target.value.indexOf(' ') >= 0){
      this.userResults = [];
      return;
    }

    const query = e.target.value;
    this.friendsService.findFriends(query).subscribe(users => {
      console.log(users);
      this.userResults = users;
    });
  }

}
