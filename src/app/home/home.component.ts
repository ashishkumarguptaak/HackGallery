import { Component, OnInit } from '@angular/core';

import { Slide } from './slide/slide';
import { SLIDES } from './slide/slides'
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  i=0;
  
  catogery = "";
  Slides: Slide[]=SLIDES;
  slide: Slide = this.Slides[this.i];
  
  constructor(public authservice: AuthService,public loginservice: LoginService) { }

  ngOnInit() {
    var navbar = new NavbarComponent(this.authservice,this.loginservice);
    navbar.ngOnInit();
  }

  public plusSlides(value: number){
    
    this.i = this.i + value;
    if(this.i === this.Slides.length)
    this.i = 0;
    else if(this.i < 0 )
      this.i = this.Slides.length-1;

      this.slide = this.Slides[this.i];

      console.log(this.i);
  }
}
