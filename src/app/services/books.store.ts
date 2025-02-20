import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { Book } from '../interfaces/book.interface';
import { pipe, switchMap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { BooksService } from './books.service';

type BooksState = {
  books: Book[];
  query: string;
  favorites: Book[];
};

const initialState: BooksState = {
  books: [],
  query: '',
  favorites: [],
};

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ query, books, favorites }) => ({
    booksToShow: computed(() => {
      const filter = query();
      const books = favorites();

      if (!filter) {
        return books;
      }

      return books.filter((book) => {
        return book.title.toLowerCase().includes(filter.toLowerCase());
      });
    }),
  })),

  withMethods((store, booksService = inject(BooksService)) => ({
    loadBooks: rxMethod<void>(
      pipe(
        switchMap(() =>
          booksService.getBooks().pipe(
            tapResponse({
              next: (books: Book[]) => {
                patchState(store, { books });
              },
              error: () => {},
            })
          )
        )
      )
    ),

    addFavorite: (book: Book) => {
      const newBooks = store.books().filter((b) => b.id !== book.id);

      patchState(store, { books: newBooks });

      patchState(store, (state) => ({
        favorites: [...state.favorites, { ...book, isFavorite: true }],
      }));
    },

    setQuery: (query: string) => patchState(store, { query }),
  })),

  withHooks({
    onInit: (store) => {
      store.loadBooks();
    },
  })
);
