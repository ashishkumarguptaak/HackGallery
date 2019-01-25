import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email = "User";
  profileimage = "../../assets/icons/female.png";

  constructor(public authservice: AuthService,public loginservice: LoginService) { }

  ngOnInit() {
    if(this.authservice.authenticated()){
      this.email = localStorage.getItem("Email");
      this.profileimage = localStorage.getItem("ProfileImage");
    }
  }

  userlogout(){
    this.loginservice.userlogout();
    console.log("Lgged Out");
  }

}
