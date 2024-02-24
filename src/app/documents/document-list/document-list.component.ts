import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

// @Component({
//   selector: 'cms-document-list',
//   templateUrl: './document-list.component.html',
//   styleUrls: ['./document-list.component.css'] // Corrected property name and used array notation
// })
// export class DocumentListComponent implements OnInit, OnDestroy {
//   documents: Document[] = [];

//   subscription: Subscription;

//   constructor(private documentService: DocumentService) { }

//   // ngOnInit(): void {
//   //   this.documents = this.documentService.getDocuments();
//   //   this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
//   //     this.documents = documents;
//   //   });

//   //   this.subscription = this.documentService.documentListChangedEvent.subscribe(
//   //     documents: Document[]
//   //   )
//   // }

//   ngOnInit(): void {
//     this.documents = this.documentService.getDocuments();

//     this.subscription = this.documentService.documentListChangedEvent.subscribe(
//       (documentsList: Document[]) => {
//         this.documents = documentsList;
//       }
//     );
//   }
// }

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
