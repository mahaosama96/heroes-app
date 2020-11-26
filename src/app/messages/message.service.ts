import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  messages: string[] = [];

  addMessage(msg: string){
    this.messages.push(msg);
  }

  clearMessages(){
    this.messages = [];
  }
}
