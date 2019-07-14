import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../notifications.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  private allNotifications: Array<any> = [];
  private userCreatedNotifications: Array<any> = [];
  constructor(
    private notificationService: NotificationsService,
  ) { }

  ngOnInit() {
    this.getAllNotifications();
    this.getUserCreatedNotifications();
  }
  getAllNotifications(): void{
    this.notificationService.getNotifications().subscribe(notifs => {
      this.allNotifications = notifs;
    });
  }
  getUserCreatedNotifications(): void{
    this.notificationService.getNotificationsByUser().subscribe(notifs => {
      this.userCreatedNotifications = notifs;
    });
  }

}
