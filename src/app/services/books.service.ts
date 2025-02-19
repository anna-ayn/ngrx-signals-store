import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../interfaces/book.interface';

const books: Book[] = [
  { id: 1, title: 'El Principito', author: 'Antoine de Saint-Exupéry' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
  { id: 4, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes' },
  { id: 5, title: 'Matar a un ruiseñor', author: 'Harper Lee' },
  { id: 6, title: 'Crimen y castigo', author: 'Fiódor Dostoyevski' },
  { id: 7, title: 'Orgullo y prejuicio', author: 'Jane Austen' },
  { id: 8, title: 'Los juegos del hambre', author: 'Suzanne Collins' },
  { id: 9, title: 'El código Da Vinci', author: 'Dan Brown' },
  { id: 10, title: 'Los pilares de la Tierra', author: 'Ken Follett' },
  {
    id: 11,
    title: 'Harry Potter y la piedra filosofal',
    author: 'J.K. Rowling',
  },
  { id: 12, title: 'El Hobbit', author: 'J.R.R. Tolkien' },
  { id: 13, title: 'Dune', author: 'Frank Herbert' },
  { id: 14, title: 'Drácula', author: 'Bram Stoker' },
  { id: 15, title: 'La sombra del viento', author: 'Carlos Ruiz Zafón' },
  { id: 16, title: 'El nombre del viento', author: 'Patrick Rothfuss' },
  { id: 17, title: 'Fundación', author: 'Isaac Asimov' },
  { id: 18, title: 'Un mundo feliz', author: 'Aldous Huxley' },
  { id: 19, title: 'It', author: 'Stephen King' },
  { id: 20, title: 'El perfume', author: 'Patrick Süskind' },
];

@Injectable({ providedIn: 'root' })
export class BooksService {
  favoritesBooks = signal<Book[]>([]);

  getBooks(): Observable<Book[]> {
    console.log('observable');
    return of(books);
  }
}
