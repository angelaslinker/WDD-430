import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];
  private maxMessageId: number = 0;
  private messagesUrl = 'https://fullstackdev-155ec-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();

  }

  getMessages(): void {
    this.http.get<{ [key: string]: Message }>(this.messagesUrl).subscribe((response) => {
      const messages: Message[] = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          messages.push({ ...response[key], id: key });
        }
      }
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      this.messages.sort((a, b) => a.subject.localeCompare(b.subject)); 
      this.messageChangedEvent.next(this.messages.slice());
    });
  }

  storeMessages(): void {
    this.http.put(this.messagesUrl, this.messages, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }


  addMessage(message: Message) {
    this.maxMessageId++;
    message.id = String(this.maxMessageId);
    this.messages.push(message);
    this.storeMessages();
  }

  getMessage(id: string): Message {
    return this.messages.find((m) => m.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((m) => {
      if (+m.id > maxId) maxId = +m.id;
    });
    return maxId;
  }

}
