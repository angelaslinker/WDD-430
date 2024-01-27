import { Component, EventEmitter, Output } from '@angular/core';
import { Contacts } from '../contact.model';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
})


export class ContactListComponent {
  @Output() contactWasSelected = new EventEmitter<Contacts>();

  contacts: Contacts[] = [
    new Contacts('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../../assets/images/jacksonk.jpg', null),
    new Contacts('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../../assets/images/barzeer.jpg', null)
  ];


  onSelected(contact: Contacts) {
    this.contactWasSelected.emit(contact);
  }



}