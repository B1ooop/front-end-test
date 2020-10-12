import { Injectable } from '@angular/core';
import { Author } from 'src/shared/classes/author';
import { Book } from 'src/shared/classes/book';
import { TableAuthor } from '../classes/tableAuthor';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() {
    if (this.getLocalStorage()) {
      this.authors = this.getLocalStorage();
    }
    this.updateTable();
  }
  tableAuthors: TableAuthor[] = [];

  authors: Author[] = [
    new Author(1, "Александр", "Пушкин", "Сергеевич", new Date(1799, 3, 26), [new Book(1, "Руслан и Людмила", 100, "Поэма"), new Book(11, "Руслан и Людмила", 100, "Поэма"), new Book(111, "Руслан и Людмила", 100, "Поэма")]),
    new Author(2, "Иван", "Тургенев", "Сергеевич", new Date(1818, 11, 9), [new Book(2, "Отцы и дети", 200, "Роман")]),
    new Author(3, "Тарас", "Шевченко", "Григорьевич", new Date(1814, 3, 9), [new Book(3, "Кобзарь", 300, "Сборник стихов")]),
  ]

  setLocalStorage(authors: Author[]): void {
    localStorage.setItem("authorsArr", JSON.stringify(authors));
    this.updateTable();
  }

  getLocalStorage(): Author[] { return JSON.parse(localStorage.getItem("authorsArr")); }

  getAuthors(): Author[] { return this.authors }

  getTableAuthors(): TableAuthor[] { return this.tableAuthors }

  getLenght(): number { return this.authors.length; }

  formatDate(birthDate: Date): string {
    birthDate = new Date(birthDate);
    return `${birthDate.getDate()}-${birthDate.getMonth()}-${birthDate.getFullYear()}`;
  }

  stringToDate(str: string): Date {
    let strArr = str.split("-");
    return new Date(parseInt(strArr[2]), parseInt(strArr[1]), parseInt(strArr[0]));
  }

  getAuthorById(id: number): Promise<Author> {
    let authorPromise = Promise.resolve(this.authors);
    return authorPromise
      .then(author => author.find(x => x.id == id))
  }

  pushEditedAuthorToArray(author: Author): void {
    let flagNewId: boolean = false;
    for (let index in this.authors) {
      if (this.authors[index].id === author.id) {
        this.authors.splice(parseInt(index), 1, author);
        flagNewId = true;
        break;
      }
    }
    if (!flagNewId) this.authors.push(author);
    this.setLocalStorage(this.authors);
  }


  deleteAuthorFromArray(id: number): void {
    let selectedAuthor: number;
    for (let index in this.authors) {
      if (this.authors[index].id === id) {
        selectedAuthor = parseInt(index);
        break;
      }
    }
    this.authors.splice(selectedAuthor, 1);
    this.setLocalStorage(this.authors);

  }

  deleteBookFromArray(id: number, book: Book): void {
    for (let index in this.authors) {
      if (this.authors[index].id === id) {
        for (let bookIndex in this.authors[index].books) {
          if (this.authors[index].books[bookIndex].id === book.id) {
            this.authors[index].books.splice(parseInt(bookIndex), 1);
          }
        }
      }
    }
    this.setLocalStorage(this.authors);
  }

  //convert some properties from raw array to array, from which table takes data
  updateTable(): void {
    this.tableAuthors.splice(0, this.tableAuthors.length)
    for (let index in this.authors) {
      let id: number;
      let initials: string;
      let booksQuantity: number;

      id = this.authors[index].id;
      initials = `${this.authors[index].lastName} ${this.authors[index].firstName.charAt(0)}.${this.authors[index].patronymic.charAt(0)}.`;
      booksQuantity = this.authors[index].books.length;

      this.tableAuthors.push(new TableAuthor(id, initials, booksQuantity));
    }
  }
}
