import { Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { BookCardComponent } from '../components/book-card.component';
import { BooksService } from '../services/books.service';
import { Book } from '../interfaces/book.interface';
import { BooksStore } from '../services/book.store';

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full max-w-4xl mt-12 mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Ngrx Signal Books!</h1>

      <p>Welcome to the Ngrx Signal Books app!</p>

      <div class="grid grid-cols-2  lg:grid-cols-3 gap-4 mt-8">
        @for(book of BooksStore.books(); track book.id) {
        <app-book-card [book]="book" (onFavorite)="favoriteBook($event)" />
        }
      </div>
    </div>
  `,
  imports: [BookCardComponent],
})
export default class HomeComponent {
  // // Inyectamos el servicio BooksService para poder utilizarlo en el componente
  // booksService = inject(BooksService);
  // // Obtenemos los libros del servicio BooksService y los convertimos a un signal
  // // La funcion toSignal esta configurado para que el valor inicial sea un array vacío para asegurarnos el valor
  // // por defecto antes de obtener los libros del servicio
  // books = toSignal(this.booksService.getBooks(), { initialValue: [] });
  // // Utilizamos un linkedSignal para filtrar los libros que se muestran en la vista
  // booksToShow = linkedSignal<Book[]>(() => this.books());
  // // Método para marcar un libro como favorito
  // favoriteBook(book: Book) {
  //   // Actualizamos la lista de libros a mostrar
  //   this.booksToShow.update((books) => {
  //     // el b.id != book.id es para eliminar de la lista el libro marcado como favorito
  //     return books.filter((b) => b.id !== book.id);
  //   });
  //   // Actualizamos la lista de libros favoritos
  //   this.booksService.favoritesBooks.update((books) => {
  //     console.log('favoriteBook', books, ' ', book);
  //     return [...books, { ...book, isFavorite: true }];
  //   });
  // }

  // Inyectamos el store BooksStore para poder utilizarlo en el componente
  BooksStore = inject(BooksStore);

  favoriteBook(book: Book) {
    this.BooksStore.addFavorite(book);
  }
}
