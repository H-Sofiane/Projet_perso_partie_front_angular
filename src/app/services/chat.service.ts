import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketIOClient } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	private url = 'http://localhost:3000';
    /*private socket;*/ 
    socket: SocketIOClient.Socket;

  constructor() {
  		this.socket = io(this.url);
  		/*this.socket = io.connect();*/
   }

   /*public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages() {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }*/



    on(eventName: any, callback:any) {
    	if(this.socket) {
    		this.socket.on(eventName, function(data:any){
    			callback(data);
    		});
    	}
    };

    emit(eventName: any, data:any) {
    	if(this.socket) {
    		this.socket.emit(eventName, data);
    	}
    };

    removeListener(eventName: any) {
    	if(this.socket) {
    		this.socket.removeListener(eventName);
    	}
    };
}
