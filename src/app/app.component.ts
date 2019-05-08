import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ContactsService } from './services/contacts.service';
import { User } from './models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /*title = 'ContactsWeb';*/

  /*user: User;

  infos: any;
	private sub: any;
	id: number;*/

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) {}

  isAdmin() {
  	return this.authService.isAdmin();
  }

  isUser() {
  	return this.authService.isUser();
  }

  isAuthenticated() {
  	return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
  	this.authService.loadToken();



  	/*this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

  	this.contactsService.findUserById(this.id).subscribe(
        user => {
          this.id = user.id;
          this.infos={
		username: user.username,
		photo: user.photo
	}
        },error => {
          console.log(error);
        }
        );*/
  }

  logOut() {
  	this.authService.logout();
  }

  /*afficherChatPage(user:User) {
    if (user) {
      this.router.navigate(['/chat/', user.id]);
      console.log(user.id);
    }
    
  }*/
  
}
