import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contacts } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contacts: Contacts[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contacts) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
