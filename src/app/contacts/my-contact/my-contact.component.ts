import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactsService } from "../../services/contacts.service";
import { Contact } from "../../models/contact";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-my-contact',
  templateUrl: './my-contact.component.html',
  styleUrls: ['./my-contact.component.css']
})
export class MyContactComponent implements OnInit {

	private sub: any;
	id: number;
	

    /*infos={
		nom: this.contact.nom,
		prenom: this.contact.prenom,
		dateNaissance: this.contact.dateNaissance,
		email: this.contact.email,
		tel: this.contact.tel,
		photo: this.contact.photo
	}*/

	infos: any;
	offres: any;
	PointCap: string;
	WestPlayer1: string;
	
  constructor(private route: ActivatedRoute,
          private router: Router,
          private contactsService: ContactsService,
          private authService: AuthenticationService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    /*this.nom = this.contact.nom;
    this.prenom = this.contact.prenom;
    this.dateNaissance = this.contact.dateNaissance;
    this.email = this.contact.email;           
    this.tel = this.contact.tel;
    this.photo = this.contact.photo;*/

    

    
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

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getOffreEmploi() {
  	return this.contactsService.getOffreEmploi()
  	.subscribe(
  		data => {
  			this.offres = {
  				PointCap:this.PointCap,
				WestPlayer1:this.WestPlayer1
  			}
  		});
  }

}
