import { Component, computed, inject, signal } from '@angular/core';
import { BookCardComponent } from '../components/book-card.component';
import { BooksService } from '../services/books.service';
import { BooksStore } from '../services/book.store';

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full max-w-4xl mt-12 mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Favorites Books!</h1>

      <div class="bg-white rounded-lg p-4 flex items-center">
        <input
          type="text"
          class="w-full border border-gray-200 rounded-lg p-2"
          placeholder="Search for a book..."
          (input)="search($any($event.target).value)"
        />
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        @for(book of booksStore.booksToShow(); track book.id) {
        <app-book-card [book]="book" />
        }
      </div>
    </div>
  `,
  imports: [BookCardComponent],
})
export default class FavoritesComponent {
  // booksService = inject(BooksService);

  booksStore = inject(BooksStore);

  // books = this.booksService.favoritesBooks;

  // query = signal<string>('');

  // booksToShow = computed(() => {
  // const query = this.query();
  // const books = this.books();

  // if (!query) {
  //   return books;
  // }

  // return books.filter((book) => {
  //   return book.title.toLowerCase().includes(query.toLowerCase());
  // });
  // });

  search(value: string) {
    // this.query.set(value);
    this.booksStore.setQuery(value);
  }
}
