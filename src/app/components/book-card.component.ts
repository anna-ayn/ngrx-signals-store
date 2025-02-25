import { Component, input, output } from '@angular/core';
import { Book } from '../interfaces/book.interface';

@Component({
  selector: 'app-book-card',
  template: `
    <div
      class="bg-white border border-gray-200 shadow-xs rounded-lg p-4 flex flex-col"
    >
      <div class="flex gap-x-4 items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold">{{ book().title }}</h2>
          <p class="text-sm text-muted-foreground">{{ book().author }}</p>
        </div>

        <button
          class="bg-transparent p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          (click)="clickButton()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16  "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="book().isFavorite ? 'fill-red-500' : 'fill-whilte'"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class BookCardComponent {
  // La propiedad input nos permite recibir datos desde el componente padre
  book = input.required<Book>();

  // La propiedad output nos permite emitir eventos al componente padre
  // En este caso, emitiremos un evento de tipo Book
  onFavorite = output<Book>();

  // Método para emitir el evento al componente padre
  clickButton() {
    // onFavorite.emit() emite el evento al componente padre
    // y le enviamos el libro actual
    this.onFavorite.emit(this.book());
  }
}
