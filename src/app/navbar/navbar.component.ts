import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email = "";

  constructor(public authservice: AuthService,public loginservice: LoginService) { }

  ngOnInit() {
    if(this.authservice.authenticated()){
      this.email = localStorage.getItem("Email");
      console.log((JSON.stringify(this.loginservice.profile)));
     // console.log(this.loginservice.profile);
    }
  }

  userlogout(){
    this.loginservice.userlogout();
    console.log("Lgged Out");
  }

}
