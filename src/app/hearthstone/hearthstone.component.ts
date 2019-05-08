import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-hearthstone',
  templateUrl: './hearthstone.component.html',
  styleUrls: ['./hearthstone.component.css']
})
export class HearthstoneComponent implements OnInit {

  constructor(private contactsService: ContactsService) { }
  cartes;
  ngOnInit() {
  	this.getHearthStoneCard();
  }

  getHearthStoneCard() {
    return this.contactsService.getHearthStoneCard()
    .subscribe(
      data => {
        this.cartes = data;
        console.log(this.cartes);
      });
  }
}
