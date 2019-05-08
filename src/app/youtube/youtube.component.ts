import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  constructor(private contactsService: ContactsService) { }

  mavideos;

  ngOnInit() {
  	this.convertisseurYoutube()
  }

  convertisseurYoutube() {
    return this.contactsService.convertisseurYoutube()
    .subscribe(
      data => {
        this.mavideos = data;
        console.log(this.mavideos);
      });
  }


}
