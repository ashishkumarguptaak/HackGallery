import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  emaildata = {sender:'', email:'', subject:'',message:'',date:new Date()};

  constructor(@Inject(ContactService) public contactservice) { }

  ngOnInit() {
  }

  public sendemail(emailForm: NgForm){
    console.log(this.emaildata);
    this.contactservice.contactmail(this.emaildata);
    this.emaildata = {sender:'', email:'', subject:'',message:'',date:new Date()};
    console.log("Done");
  }

}
