import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  selectedDocumentEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documentsUrl = 'https://fullstackdev-155ec-default-rtdb.firebaseio.com/documents.json';
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.getDocuments();
  }


  getDocuments() {
    this.http.get<{ [key: string]: Document }>(this.documentsUrl)
      .subscribe({
        next: (response) => {
          const docsArray: Document[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              docsArray.push({ ...response[key], id: key });
            }
          }
          this.documents = docsArray;
          this.maxDocumentId = this.getMaxId();
          this.sortDocuments();
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error) => console.error(error)
      });
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.documentsUrl, this.documents, { headers: headers })
      .subscribe({
        next: () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error) => console.error(error)
      });
  }

  addDocument(newDoc: Document) {
    if (!newDoc) return;
    this.maxDocumentId++;
    newDoc.id = String(this.maxDocumentId);
    this.documents.push(newDoc);
    this.storeDocuments();
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find((d) => d.id === id);
  }

  updateDocument(original: Document, newDoc: Document) {
    if (!newDoc || !original) return;
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDoc.id = original.id;
    this.documents[pos] = newDoc;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.findIndex((d) => d.id === document.id);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    return this.documents.reduce((a, b) => Math.max(a, +b.id), 0);
  }

  sortDocuments(): void {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
  }

}
