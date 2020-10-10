import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/shared/classes/author';
import { TableAuthor } from 'src/shared/classes/tableAuthor';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end-test-app';
  authors: Author[];
  tableAuthors: TableAuthor[];

  constructor(private dataStorage: DataStorageService, private router: Router) {
    this.tableAuthors = dataStorage.getTableAuthors();
    this.authors = dataStorage.getAuthors();

  }

  editAuthor(selectedAuthor: Author): void {
    this.router.navigate(["author", selectedAuthor.id]);
  }

  deleteAuthor(id: number): void {
    this.dataStorage.deleteAuthorFromArray(id);
    this.router.navigate([""]);
  }
}
