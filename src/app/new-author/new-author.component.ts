import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from 'src/shared/classes/author';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { ValidatorService } from 'src/shared/services/validator.service';

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
  }

  returnToRoot(): void {
    this.router.navigate([""]);
  }

  submit(event) {
    // This hardcode should be refactored
    this.author = new Author(
      this.dataService.getLenght() + 1,
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      event.target[3].value,
      []
    );
    this.dataService.pushEditedAuthorToArray(this.author);
    this.returnToRoot();
  }
}
