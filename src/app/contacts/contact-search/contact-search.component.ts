import { Component, OnInit } from '@angular/core';
 
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Contact } from '../../models/contact';

import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {

	contacts$: Observable<Contact[]>;
  private searchTerms = new Subject<string>();
   private contacts: Contact[];
   motCle: string="";
   page: number=0;
   size: number=5;
   leContact: Contact;

  constructor(private contactsService: ContactsService) { }

  // Push a search term into the observable stream.
  search(motCle: string): void {
    this.searchTerms.next(motCle);
  }

  ngOnInit(): void {
  	this.contacts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((motCLe: string) => this.contactsService.getContacts(motCLe, this.page, this.size)),
    );
  }

   doSearch() {
    this.contactsService.getContacts(this.motCle, this.page, this.size).subscribe(
      contacts => {
        this.contacts = contacts.filter(res=>{
        	return res.nom.match(this.motCle);
        })
        //switchMap(data => this.contacts as Array<Contact>)
        
      },
      err => {
        console.log(err);
      }
      );
  }

  

  chercher(): void {
    this.doSearch();
    //this.contactsService.getContacts(this.motCle);
    //this.searchMotCle.next(motCle);
    /*this.contacts = this.contacts.filter(res=>{
    	return res.nom.toLowerCase().match(this.leContact.nom);
    });*/
  }

}
