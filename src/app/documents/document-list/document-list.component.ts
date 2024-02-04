import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('1', 'Document 1', 'Description of Document 1', 'http://url-to-document1.com', null),
    new Document('2', 'Document 2', 'Description of Document 2', 'http://url-to-document2.com', null),
    new Document('3', 'Document 3', 'Description of Document 3', 'http://url-to-document3.com', null),
    new Document('4', 'Document 4', 'Description of Document 4', 'http://url-to-document4.com', null),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
