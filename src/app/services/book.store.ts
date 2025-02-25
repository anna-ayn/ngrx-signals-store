import { Book } from '../interfaces/book.interface';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { BooksService } from './books.service';
import { inject, computed } from '@angular/core';

type BookState = {
  books: Book[];
  query: string;
  favorites: Book[];
};

const initialState: BookState = {
  books: [],
  query: '',
  favorites: [],
};

export const BooksStore = signalStore(
  { providedIn: 'root' },
  // This configures the store to be provided in the root injector, making it a singleton available throughout the application.

  withState(initialState),
  // Initializes the store with the initial state defined in the `initialState` object.

  withComputed(({ query, books, favorites }) => ({
    // Defines computed properties based on the store's state.

    booksToShow: computed(() => {
      // Creates a computed property named `booksToShow`.

      const filter = query();
      // Retrieves the current value of the `query` signal.

      const books = favorites();
      // Retrieves the current value of the `favorites` signal.

      if (!filter) {
        return books;
        // If the query is empty, return the full list of favorite books.
      }

      return books.filter((book) => {
        return book.title.toLowerCase().includes(filter.toLowerCase());
        // Filters the books to include only those whose titles contain the query string (case-insensitive).
      });
    }),
  })),

  withMethods((store, booksService = inject(BooksService)) => ({
    // Defines methods that can be called to interact with the store.

    // rxMethod<void>: to define a reactive method that returns an observable
    // the void type parameter indicates that the method doesn not take any arguments
    loadBooks: rxMethod<void>(
      pipe(
        // pipe: to compose multipe rxjs operators into a single function
        switchMap(() =>
          // to switch to a new observable whenever the source observable emits a value
          booksService.getBooks().pipe(
            tapResponse({
              // to handle the response from the getBooks observable
              next: (books: Book[]) => {
                patchState(store, { books });
                // Updates the store's state with the fetched books when the observable emits a value.
              },
              error: (error) => {
                console.log('Error loading books ', error);
              },
              // Handles errors (currently does nothing on error).
            })
          )
        )
      )
    ),
    // Defines a method named `loadBooks` that loads books from the `BooksService` and updates the store's state.

    addFavorite: (book: Book) => {
      const newBooks = store.books().filter((b) => b.id !== book.id);
      // Filters out the book being added to favorites from the main list of books.

      patchState(store, { books: newBooks });
      // Updates the store's state with the new list of books.

      patchState(store, (state) => ({
        favorites: [...state.favorites, { ...book, isFavorite: true }],
        // Adds the book to the list of favorite books and marks it as a favorite.
      }));
      console.log('store.favorites', store.favorites());
      // Logs the updated list of favorite books to the console.
    },
    // Defines a method named `addFavorite` that adds a book to the list of favorite books.

    setQuery: (query: string) => patchState(store, { query: query }),
    // Defines a method named `setQuery` that updates the search query in the store's state.
  })),

  withHooks({
    onInit: (store) => {
      store.loadBooks();
      // Calls the `loadBooks` method when the store is initialized to fetch and load the books into the store.
    },
  })
);
