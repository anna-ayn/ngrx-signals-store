import { Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { BookCardComponent } from '../components/book-card.component';
import { BooksService } from '../services/books.service';
import { Book } from '../interfaces/book.interface';

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full max-w-4xl mt-12 mx-auto">
      <h1 class="text-2xl font-bold mb-4">Ngrx Signal Books!</h1>

      <p>Welcome to the Ngrx Signal Books app!</p>

      <div class="grid grid-cols-3 gap-4 mt-8">
        @for(book of booksToShow(); track book.id) {
        <app-book-card [book]="book" (onFavorite)="favoriteBook($event)" />
        }
      </div>
    </div>
  `,
  imports: [BookCardComponent],
})
export default class HomeComponent {
  booksService = inject(BooksService);

  books = toSignal(this.booksService.getBooks(), { initialValue: [] });

  booksToShow = linkedSignal<Book[]>(() => this.books());

  favoriteBook(book: Book) {
    this.booksToShow.update((books) => {
      return books.filter((b) => b.id !== book.id);
    });

    this.booksService.favoritesBooks.update((books) => {
      return [...books, { ...book, isFavorite: true }];
    });
  }
}
