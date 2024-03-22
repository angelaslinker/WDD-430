// import { EventEmitter, Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Subject } from 'rxjs';
// import { Contact } from './contact.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ContactService {
//   contactSelectedEvent = new EventEmitter<Contact>();
//   contactListChangedEvent = new Subject<Contact[]>();

//   // Create variable for database URL
//   private contactsUrl =
//     'https://fullstackdev-155ec-default-rtdb.firebaseio.com/contacts.json';
//   private contacts: Contact[] = [];

//   private maxContactId: number;

//   // Providing instance of HttpClient to interact with the database 
//   constructor(private http: HttpClient) { }

//   getContacts(): Contact[] {
//     this.http
//       .get<Contact[]>(this.contactsUrl)
//       .subscribe((contacts: Contact[]) => {
//         this.contacts = contacts;
//         this.maxContactId = this.getMaxId();
//         this.contacts.sort((a, b) => {
//           if (a < b) return -1;
//           if (a > b) return 1;
//           return 0;
//         });
//         this.contactListChangedEvent.next(this.contacts.slice());
//       });

//     return this.contacts.slice();
//   }



//   storeContacts() {
//     this.http
//       .put(this.contactsUrl, JSON.stringify(this.contacts), {
//         headers: new HttpHeaders().set('Content-Type', 'application/json'),
//       })
//       .subscribe(() => {
//         this.contacts.sort((a, b) => {
//           if (a < b) return -1;
//           if (a > b) return 1;
//           return 0;
//         });
//         this.contactListChangedEvent.next(this.contacts.slice());
//       });
//   }

//   addContact(newContact: Contact) {
//     if (newContact === null || newContact === undefined) return;
//     this.maxContactId++;
//     newContact.id = `${this.maxContactId}`;
//     this.contacts.push(newContact);
//     this.storeContacts();
//   }

//   getContact(id: string): Contact {
//     return this.contacts.find((c) => c.id === id);
//   }

//   updateContact(original: Contact, newContact: Contact) {
//     if (
//       newContact === null ||
//       newContact === undefined ||
//       original === null ||
//       original === undefined
//     ) {
//       return;
//     }
//     const pos = this.contacts.indexOf(original);
//     if (pos < 0) return;

//     newContact.id = original.id;
//     this.contacts[pos] = newContact;
//     this.storeContacts();
//   }

//   deleteContact(contact: Contact) {
//     if (!contact) return;
//     const pos = this.contacts.indexOf(contact);
//     if (pos < 0) return;
//     this.contacts.splice(pos, 1);
//     this.storeContacts();
//   }

//   getMaxId(): number {
//     let maxId = 0;
//     this.contacts.forEach((c) => {
//       if (+c.id > maxId) maxId = +c.id;
//     });
//     return maxId;
//   }

// }
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contactsUrl = 'http://localhost:3000/contacts';
  private contacts: Contact[] = [];

  constructor(private http: HttpClient) { }

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.contactsUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts = res.contacts;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    newContact.id = '';
    this.http
      .post<{ message: string; contact: Contact }>(
        this.contactsUrl,
        newContact,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts.push(res.contact);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  updateContact(original: Contact, newContact: Contact) {
    if (!newContact || !original) return;
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;

    newContact.id = original.id;
    newContact._id = original._id;
    this.http
      .put<{ message: string }>(
        `${this.contactsUrl}/${original.id}`,
        newContact,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts[pos] = newContact;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.contactsUrl}/${contact.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts.splice(pos, 1);
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
  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id || c._id === id);
  }

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  //#endregion "Helpers"
}
