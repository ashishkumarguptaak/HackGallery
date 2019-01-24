import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VerifyService } from '../services/verify.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  otp: string;
  incorrect = false

  constructor(@Inject(VerifyService) public verifyservice) { }

  ngOnInit() {
  }

  public verifyUser(otpForm: NgForm){
    var encrypted = CryptoJS.enc.Utf8.parse(this.otp).toString();
    var sotp = localStorage.getItem("OTP");

    if(encrypted === sotp){
      this.incorrect = false
      this.verifyservice.verify();}
    else{
      this.incorrect = true;
      console.log("Wrong OTP");
    }

    otpForm.resetForm();
  }

}
