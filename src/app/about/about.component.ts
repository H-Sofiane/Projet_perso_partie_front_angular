import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactsService } from "../services/contacts.service";
import { Contact } from "../models/contact";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ContactsService]
})
export class AboutComponent implements OnInit {
	/*infos={
		name:'sofiane',
		email:'haddad-sofiane@live.fr'
	}*/

  id: number;
  contact: Contact;
  contactForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
          private router: Router,
          private contactsService: ContactsService) { }

  ngOnInit() {
    /*this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) {
      this.contactsService.findById(this.id).subscribe(
        contact => {
          this.id = contact.id;
          this.contactForm.patchValue({
            nom: contact.nom,
            prenom: contact.prenom,
            dateNaissance: contact.dateNaissance,
            email: contact.email,           
            tel: contact.tel,
            photo: contact.photo
          });
        },error => {
          console.log(error);
        }
        );
    }*/
  }

}
