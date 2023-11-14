import { Component, OnInit } from '@angular/core';
import { IPublisher } from 'src/app/Models/ipublisher';
import { PublisherService } from 'src/app/Services/publisher.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css'],
})
export class UserFollowingComponent implements OnInit {
  isUserLogged: boolean;
  followings: IPublisher[] = [];

  constructor(
    private authService: UserAuthService,
    private publisherService: PublisherService
  ) {
    this.isUserLogged = this.authService.isLogged;
  }

  UnFollow(id: number) {
    console.log(id);

    this.publisherService.UnFollow(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res.data);
          let followingIndex = this.followings.indexOf(res.data);
          this.followings.splice(followingIndex, 1);
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));

    this.publisherService.getFollowings().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.followings = res.data;
          console.log(res.data);
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
