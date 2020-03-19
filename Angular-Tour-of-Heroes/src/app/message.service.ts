import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  /** Add a message to the cache */
  add(message: string){
    this.messages.push(message);
  }
  /** Clear messages from the cache */
  clear(){
    this.messages = [];
  }
  constructor() { }
}
