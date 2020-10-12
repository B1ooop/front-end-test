import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/shared/classes/author';
import { TableAuthor } from 'src/shared/classes/tableAuthor';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { ValidatorService } from 'src/shared/services/validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end-test-app';
  authors: Author[];
  tableAuthors: TableAuthor[];

  constructor(
    private dataService: DataStorageService,
     private router: Router,
     private validatorService: ValidatorService
     ) {
    this.tableAuthors = dataService.getTableAuthors();
    this.authors = dataService.getAuthors();

  }

  editAuthor(selectedAuthor: Author): void {
    this.router.navigate(["editAuthor", selectedAuthor.id]);   
  }

  deleteAuthor(id: number): void {
    this.dataService.deleteAuthorFromArray(id);
    this.router.navigate([""]);
  }

  viewAuthor(id:number):void {
    
  }
}
