import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Author } from 'src/shared/classes/author';
import { Book } from 'src/shared/classes/book';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { ValidatorService } from 'src/shared/services/validator.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],


})
export class AuthorDetailsComponent implements OnInit, AfterViewInit {
  author: Author;
  formEditAuthor: FormGroup;
  id: number;
  books: Book[];

  flagEditingBook: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private dataService: DataStorageService,
    private fb: FormBuilder,
    private router: Router,
    private validatorService: ValidatorService
  ) {

  }

  ngOnInit(): void {
    //get current author from aray from dataStorageService 
    this.activatedRouter.params.forEach((params: Params) => {
      this.id = parseInt(params["id"]);
      this.dataService
        .getAuthorById(this.id)  //get Promise here
        .then(result => {
          this.author = result
          this.books = this.author.books;

          this.formEditAuthor = this.fb.group({
            firstName: [this.author.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(23), Validators.pattern(this.validatorService.anyNameValidator())]],
            lastName: [this.author.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(23), Validators.pattern(this.validatorService.anyNameValidator())]],
            patronymic: [this.author.patronymic, [Validators.required, Validators.minLength(3), Validators.maxLength(23), Validators.pattern(this.validatorService.anyNameValidator())]],
            birthDate: [this.dataService.formatDate(this.author.birthDate), [Validators.required, Validators.pattern(this.validatorService.dateValidator())]],
          })
        });
    });
  }

  ngAfterViewInit(): void {

  }


  deleteBook(id: number, book: Book): void {
    this.dataService.deleteBookFromArray(id, book);
  }

  editBook(bookId: Book): void {
  }

  addBook(): void {
  }

  returnToRoot(): void {
    this.router.navigate([""]);
  }

  submit(
    event,
    author: Author,
    firstName: string,
    lastName: string,
    patronymic: string,
    birthDate: string
  ): void {
    this.author = new Author(
      this.id,
      firstName,
      lastName,
      patronymic,
      this.dataService.stringToDate(birthDate),
      this.books
    );
    this.dataService.pushEditedAuthorToArray(this.author);
  }
}

