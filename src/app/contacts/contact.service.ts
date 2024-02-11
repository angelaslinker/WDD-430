import { Injectable, EventEmitter } from '@angular/core';
import { Contacts } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contacts>();
  contacts: Contacts[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contacts[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contacts {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

}
