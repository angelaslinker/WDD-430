import { Component, OnInit } from '@angular/core';
import { Contacts } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  selectedContact: Contacts;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe((contact: Contacts) => {
      this.selectedContact = contact;
    });
  }
}
