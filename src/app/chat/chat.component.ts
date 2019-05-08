import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SocketIOClient, io } from 'socket.io-client';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	messageText: string;
	messages: Array<any>;
	infos: any;
	private sub: any;
	id: number;
	/*message: string;
	messages: string[] = [];*/
	

  constructor(private route: ActivatedRoute,
          private router: Router, private chatService: ChatService, private contactsService: ContactsService) { 
  	
  }

  /*sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }*/

  ngOnInit() {

  	this.sub = this.route.params.subscribe(params => {
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
        );

  	console.log(this.infos);
  	/*this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
        this.message = message;
        console.log(this.message);
      });*/
      /*this.chatService.emit('event1', {
      	msg:'Client to server, can you hear me server ?'
      });

      this.chatService.on('event2', (data: any) => {
      	console.log(data.msg);
      	this.chatService.emit('event3', {
      		msg:'Yes, its orking for me'
      	});
      });

      this.chatService.on('event4',(data:any) => {
      	console.log(data.msg);
      });*/

      this.messages = new Array();

      this.chatService.on('message-received',(msg:any) => {
      	this.messages.push(msg);
      	console.log(msg);
      	//console.log(this.mesmessages);
      });
  }

  sendMessage() {
  	const message = {
  		text: this.messageText
  	}
  	this.chatService.emit('send-message', message);
  	this.messageText ='';
  }
}
