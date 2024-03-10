// import { Component, OnInit } from '@angular/core';
// import { Message } from '../message.model';
// import { MessageService } from '../message.service';

// @Component({
//   selector: 'app-message-list',
//   templateUrl: './message-list.component.html',
//   styleUrls: ['./message-list.component.css'],
// })
// export class MessageListComponent implements OnInit {
//   messages: Message[] = [];

//   constructor(private messageService: MessageService) { }

//   ngOnInit(): void {
//     this.messages = this.messageService.getMessages();
//     this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
//       this.messages = messages;
//     });
//   }

//   onAddMessage(message: Message) {
//     this.messages.push(message);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Remove the direct assignment since getMessages() does not return a value
    // this.messages = this.messageService.getMessages(); // <-- Remove this line

    // Correctly subscribe to the messageChangedEvent to get the messages
    this.subscription = this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );

    // Make sure to call getMessages() to initiate fetching messages
    this.messageService.getMessages();
  }

  ngOnDestroy() {
    // Cleanup by unsubscribing to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
