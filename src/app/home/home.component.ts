import { Component, inject } from '@angular/core';

import { BookCardComponent } from '../components/book-card.component';
import { Book } from '../interfaces/book.interface';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full max-w-4xl mt-12 mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Ngrx Signal Books!</h1>

      <p>Welcome to the Ngrx Signal Books app!</p>

      <div class="grid grid-cols-2  lg:grid-cols-3 gap-4 mt-8">
        @for(book of booksStore.books(); track book.id) {
        <app-book-card [book]="book" (onFavorite)="favoriteBook($event)" />
        }
      </div>
    </div>
  `,
  imports: [BookCardComponent],
})
export default class HomeComponent {
  booksStore = inject(BooksStore);

  favoriteBook(book: Book) {
    this.booksStore.addFavorite(book);
  }
}
