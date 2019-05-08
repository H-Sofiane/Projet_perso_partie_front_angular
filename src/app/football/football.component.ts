import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform, SecurityContext, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeValue, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})


export class FootballComponent implements OnInit{


  constructor(private contactsService: ContactsService) { }

  matchs;
  matche;
  

  ngOnInit() {
  	this.getFootball();

  	const matche = Observable.apply;
  }

  getFootball() {
    return this.contactsService.getFootball()
    .subscribe(
      data => {
        this.matchs = data;
        console.log(this.matchs);
      });
  }



}
