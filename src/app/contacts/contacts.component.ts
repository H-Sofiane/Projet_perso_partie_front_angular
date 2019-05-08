import { Component, OnInit, ViewChild } from '@angular/core'; 
import { Contact } from '../models/contact';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, pipe } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactsService]
})
export class ContactsComponent implements OnInit {

  pageContacts:any;

  motCle: string="";
  page: number=0;
  size: number=5;
  pages:Array<number>;
  pageActuelle: number = 1;
  mesContacts;
  infos: any;
  id: number;
  private sub: any;
  libelle: string;

  posts;

  @ViewChild('filterInput') filterInput: NgModel;

  private contacts: Contact[];
   
  private searchMotCle = new Subject<string>();


  constructor(private router: Router, private route: ActivatedRoute,private contactsService: ContactsService, private authService: AuthenticationService) { }

  ngOnInit() {
  	this.getAllContacts();

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.contactsService.findById(this.id).subscribe(
        contact => {
          this.id = contact.id;
          this.infos={
    nom: contact.nom,
    prenom: contact.prenom,
    dateNaissance: contact.dateNaissance,
    email: contact.email,
    tel: contact.tel,
    photo: contact.photo
  }
        },error => {
          console.log(error);
        }
        );
  }

  getAllContacts() {
    this.contactsService.findAll().subscribe(
      data => {
        this.contacts = data;
        console.log(this.contacts);
      },
      err => {
        console.log(err);
      }
      );
  }

  afficherContactPage(contact: Contact) {
    if (contact) {
      this.router.navigate(['/contacts/afficher', contact.id]);
    }
  }

  editContactPage(contact: Contact) {
    if (contact) {
      this.router.navigate(['/contacts/edit', contact.id]);
    }
  }

  deleteContact(contact: Contact) {
    if (contact) {
      this.contactsService.deleteContactById(contact.id).subscribe(
        res => {
          this.getAllContacts();
          this.router.navigate(['/contacts']);
          console.log('done');
        })
    }
  }

  doSearch() {
    this.contactsService.getContacts(this.motCle,this.page,this.size).subscribe(
      (data: any) => {
        console.log(data);
       this.contacts = data;
       this.pages = new Array(data.totalPages);
       console.log(this.pages);
      },
      err => {
        console.log(err);
      }
      );
  }

  

  chercher() {
    this.doSearch();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getOffreEmploi(libelle:string) {
    return this.contactsService.getOffreEmploi()
    .subscribe(
      (data: any) => {
        libelle = data;
        console.log(libelle);
      });
  }

}
