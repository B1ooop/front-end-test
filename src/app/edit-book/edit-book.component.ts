import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/shared/classes/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  @Input() book: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
