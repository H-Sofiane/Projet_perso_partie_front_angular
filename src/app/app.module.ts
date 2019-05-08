import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';

import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { HttpClientModule } from '@angular/common/http';
import { NewContactComponent } from './contacts/new-contact/new-contact.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsService } from './services/contacts.service';
import { ContactSearchComponent } from './contacts/contact-search/contact-search.component';
import { ChatService } from './services/chat.service';

import {NgxPaginationModule} from 'ngx-pagination';
import { MyContactComponent } from './contacts/my-contact/my-contact.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './services/authentication.service';
import { ApiresttestComponent } from './apiresttest/apiresttest.component';
import { HearthstoneComponent } from './hearthstone/hearthstone.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { FootballComponent } from './football/football.component';
import { SafePipe } from './safe.pipe';
import { ChatComponent } from './chat/chat.component';

import { ProgressBarModule } from 'angular-progress-bar';
import { DeeplearningComponent } from './deeplearning/deeplearning.component';
import { MachinelearningComponent } from './machinelearning/machinelearning.component';

const appRoutes: Routes = [
{ path: 'about', component: AboutComponent },
{ path: 'newcontact', component: NewContactComponent },
{ path: 'contacts', component: ContactsComponent },
{ path: 'contacts/afficher/:id', component: MyContactComponent },
{path: 'contacts/edit/:id', component: NewContactComponent},
{ path: 'apiresttest', component: ApiresttestComponent },
{ path: 'hearthstone', component: HearthstoneComponent },
{ path: 'youtube', component: YoutubeComponent },
{ path: 'football', component: FootballComponent },
{ path: 'chat', component: ChatComponent },
{ path: 'deeplearning', component: DeeplearningComponent },
{ path: 'machinelearning', component: MachinelearningComponent },
{path: 'login', component: LoginComponent}/*,
{ path: '',
  redirectTo: '',
  pathMatch: 'full' }*/
  ];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AboutComponent,
    NewContactComponent,
    ContactSearchComponent,
    MyContactComponent,
    LoginComponent,
    ApiresttestComponent,
    HearthstoneComponent,
    YoutubeComponent,
    FootballComponent,
    SafePipe,
    ChatComponent,
    DeeplearningComponent,
    MachinelearningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ProgressBarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ContactsService, AuthenticationService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
