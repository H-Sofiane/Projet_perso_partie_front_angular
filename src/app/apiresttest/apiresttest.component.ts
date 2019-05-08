import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-apiresttest',
  templateUrl: './apiresttest.component.html',
  styleUrls: ['./apiresttest.component.css']
})
export class ApiresttestComponent implements OnInit {

  constructor(private contactsService: ContactsService) { }

  abcds;
  cartes;

  ngOnInit() {
  	this.getTestUrl();
  }

  getTestUrl() {
    return this.contactsService.getTestUrl()
    .subscribe(
      data => {
        this.abcds = data;
        console.log(this.abcds);
      });
  }

  

}
