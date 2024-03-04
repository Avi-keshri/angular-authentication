import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  loadUsers: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.userService.$refreshTokenReceived.subscribe((res: any) => {
      this.getUsers();
    })
  }

  getUsers() {
    this.userService.getAllUsers().pipe(take(1)).subscribe((res: any) => {
      this.loadUsers = res.result ? res.data : [];
    })
  }

}
