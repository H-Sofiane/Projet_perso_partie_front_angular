import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactsService } from "../../services/contacts.service";
import { Contact } from "../../models/contact";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css'],
  providers: [ContactsService]
})
export class NewContactComponent implements OnInit {

	id: number;
  contact: Contact;
  contactForm: FormGroup;
  private sub: any;
  selectedFile: File = null;
  maPhoto;
  myImg;

  constructor(private route: ActivatedRoute,
          private router: Router,
          private contactsService: ContactsService,
          private http: HttpClient,
          private authService: AuthenticationService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.contactForm = new FormGroup({
  		nom: new FormControl('', Validators.required),
  		prenom: new FormControl('', Validators.required),
  		dateNaissance: new FormControl('', Validators.required),
  		email: new FormControl('', [Validators.required,
  			Validators.pattern("[^ @]*@[^ @]*")]),
  		tel: new FormControl('', Validators.required),
  		photo: new FormControl('', Validators.required)
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
    }
  }

  ngOnDestroy(): void {
  	this.sub.unsubscribe();
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    const fd = new FormData();
    fd.append('assets/images/', this.selectedFile, this.selectedFile.name);
    this.myImg = 'assets/images/' + this.selectedFile.name;
    this.maPhoto = this.http.post('http://localhost:4200/addcontacts', fd).subscribe(res => {console.log(res)});
  	if (this.contactForm.valid) {
  		if(this.id){
  		let contact: Contact = new Contact(this.id,
  			this.contactForm.controls['nom'].value,
  			this.contactForm.controls['prenom'].value,
  			this.contactForm.controls['dateNaissance'].value,
			this.contactForm.controls['email'].value,
			this.contactForm.controls['tel'].value,
      this.contactForm.controls['photo'].value
			/*this.myImg*/);
			this.contactsService.updateContact(contact).subscribe(

				res => {
  					this.router.navigate(['/contacts']);
  					console.log('done');
  				}
			);
  		} else {
  			let contact: Contact = new Contact(null,
  			this.contactForm.controls['nom'].value,
  			this.contactForm.controls['prenom'].value,
			this.contactForm.controls['dateNaissance'].value,
			this.contactForm.controls['email'].value,
			this.contactForm.controls['tel'].value,
      this.contactForm.controls['photo'].value
			/*this.myImg*/);
			this.contactsService.saveContact(contact)
      .subscribe(

				res => {
  					this.router.navigate(['/contacts']);
  					console.log('done');
  				},err => {
            console.log(err);
          }
			);
  		}
  	}
  	this.contactForm.reset();
  	this.router.navigate(['/contacts']);
  }

  onSaveContact(){const fd = new FormData();
    fd.append('assets/images/', this.selectedFile, this.selectedFile.name);
    this.myImg = 'assets/images/' + this.selectedFile.name;
    this.maPhoto = this.http.post('http://localhost:8080/addcontacts', fd, {headers:this.contactsService.headers}).subscribe(res => {console.log(res)});
    if (this.contactForm.valid) {
      if(this.id){
      let contact: Contact = new Contact(this.id,
        this.contactForm.controls['nom'].value,
        this.contactForm.controls['prenom'].value,
        this.contactForm.controls['dateNaissance'].value,
      this.contactForm.controls['email'].value,
      this.contactForm.controls['tel'].value,
      /*this.contactForm.controls['photo'].value*/
      this.myImg);
      this.contactsService.updateContact(contact).subscribe(

        res => {
            this.router.navigate(['/contacts']);
            console.log('done');
          }
      );
      } else {
    let contact: Contact = new Contact(null,
        this.contactForm.controls['nom'].value,
        this.contactForm.controls['prenom'].value,
      this.contactForm.controls['dateNaissance'].value,
      this.contactForm.controls['email'].value,
      this.contactForm.controls['tel'].value,
      /*this.contactForm.controls['photo'].value*/
      this.myImg);
    this.contactsService.saveContact(contact)
    .subscribe(data=>{
        this.router.navigate(['/contacts']);
        console.log('done');
    });

  }

}
}
  

}
