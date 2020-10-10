import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from 'src/shared/classes/author';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.scss']
})
export class NewAuthorComponent implements OnInit {

  author: Author;
  formEditAuthor: FormGroup;
  id: number;

  constructor(
    private service: DataStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formEditAuthor = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      patronymic: ["", [Validators.required]],
      birthDate: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  returnToRoot(): void {
    this.router.navigate([""]);
  }

  submit(event) {
    // Переделать этот хардкод
    this.author = new Author(
      this.service.getLenght() + 1,
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      event.target[3].value,
      []
    );
    this.service.pushEditedAuthor(this.author);
    this.returnToRoot();
  }
}
