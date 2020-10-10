import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Author } from 'src/shared/classes/author';
import { Book } from 'src/shared/classes/book';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  author: Author;
  formEditAuthor: FormGroup;
  id: number;
  books: Book[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private service: DataStorageService,
    private fb: FormBuilder,
    private router: Router) {

    this.formEditAuthor = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      patronymic: ["", [Validators.required]],
      birthDate: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.activatedRouter.params.forEach((params: Params) => {
      this.id = parseInt(params["id"]);
      this.service
        .getAuthorById(this.id)  // обращаемся к сервису и запрашиваем  по id. Получаем Promise
        .then(result => {
          this.author = result
          this.books = this.author.books;
        });
    });
  }

  deleteBook(id: number, book: Book): void {
    this.service.deleteBookFromArray(id, book);
  }

  editBook(): void {

  }

  addBook(): void {

  }

  returnToRoot(): void {
    this.router.navigate([""]);
  }

  submit(event): void {
    this.author = new Author(
      this.id,
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      event.target[3].value,
      this.books
    );
    this.service.pushEditedAuthor(this.author);
  }
}

