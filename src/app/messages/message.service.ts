// import { EventEmitter, Injectable } from '@angular/core';
// import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
// import { HttpClient, HttpHeaders } from '@angular/common/http';


// @Injectable({
//   providedIn: 'root',
// })
// export class MessageService {
//   messageChangedEvent = new EventEmitter<Message[]>();
//   private messages: Message[] = [];
//   private maxMessageId: number = 0;
//   private messagesUrl = 'https://fullstackdev-155ec-default-rtdb.firebaseio.com/messages.json';

//   constructor(private http: HttpClient) {
//     this.messages = MOCKMESSAGES;
//     this.maxMessageId = this.getMaxId();

//   }

//   getMessages(): void {
//     this.http.get<{ [key: string]: Message }>(this.messagesUrl).subscribe((response) => {
//       const messages: Message[] = [];
//       for (const key in response) {
//         if (response.hasOwnProperty(key)) {
//           messages.push({ ...response[key], id: key });
//         }
//       }
//       this.messages = messages;
//       this.maxMessageId = this.getMaxId();
//       this.messages.sort((a, b) => a.subject.localeCompare(b.subject)); 
//       this.messageChangedEvent.next(this.messages.slice());
//     });
//   }

//   storeMessages(): void {
//     this.http.put(this.messagesUrl, this.messages, {
//       headers: new HttpHeaders().set('Content-Type', 'application/json'),
//     }).subscribe(() => {
//       this.messageChangedEvent.next(this.messages.slice());
//     });
//   }


//   addMessage(message: Message) {
//     this.maxMessageId++;
//     message.id = String(this.maxMessageId);
//     this.messages.push(message);
//     this.storeMessages();
//   }

//   getMessage(id: string): Message {
//     return this.messages.find((m) => m.id === id);
//   }

//   getMaxId(): number {
//     let maxId = 0;
//     this.messages.forEach((m) => {
//       if (+m.id > maxId) maxId = +m.id;
//     });
//     return maxId;
//   }

// }

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  private messagesUrl = 'http://localhost:3000/messages';
  private messages: Message[] = [];

  constructor(private http: HttpClient) { }

  //#region "CRUD"
  getMessages() {
    this.http
      .get<{ message: string; messageObjs: Message[] }>(this.messagesUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          console.log(res.messageObjs);
          this.messages = res.messageObjs;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  addMessage(newMsg: Message) {
    if (!newMsg) return;
    newMsg.id = '';
    this.http
      .post<{ message: string; messageObj: Message }>(
        this.messagesUrl,
        newMsg,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.messages.push(res.messageObj);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }
  //#endregion "CRUD"

  //#region "Helpers"
  getMessage(id: string): Message {
    return this.messages.find((m) => m.id === id);
  }

  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }
  //#endregion "Helpers"
}
