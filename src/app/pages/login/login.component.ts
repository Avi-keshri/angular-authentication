import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj = {
    "EmailId": "",
    "Password": ""
  }

  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.userService.onLogin(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem('JwtLoginToken', JSON.stringify(res.data));
        this.router.navigate(['dashboard']);
      } else {
        alert(res.message);
      }
    }, error => {
      console.log(error);
      alert('Wrong Credentials');
    });
  }
}
