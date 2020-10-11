import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Author } from 'src/shared/classes/author';
import { Book } from 'src/shared/classes/book';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { ValidatorService } from 'src/shared/services/validator.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],


})
export class AuthorDetailsComponent implements OnInit {
  author: Author;
  formEditAuthor: FormGroup;
  id: number;
  books: Book[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private dataService: DataStorageService,
    private fb: FormBuilder,
    private router: Router,
    private validatorService: ValidatorService
  ) {


    this.formEditAuthor = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(23), Validators.pattern(this.validatorService.anyNameValidator())]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(23), Validators.pattern(this.validatorService.anyNameValidator())]],
      patronymic: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(23), Validators.pattern(this.validatorService.anyNameValidator())]],
      birthDate: ["", [Validators.required]],
    })
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
        });
    });

    //reset form validators when routing to another :id 
    this.validatorService.getResetFormSubject().subscribe(response => {
      if (response) {
        this.formEditAuthor.reset();
      }
    })
  }

  deleteBook(id: number, book: Book): void {
    this.dataService.deleteBookFromArray(id, book);
  }

  editBook(author: Author): void {
  }

  addBook(): void {

  }

  returnToRoot(): void {
    this.router.navigate([""]);
  }

  submit(event): void {
    // This hardcode should be refactored
    this.author = new Author(
      this.id,
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      event.target[3].value,
      this.books
    );
    this.dataService.pushEditedAuthorToArray(this.author);
  }
}

