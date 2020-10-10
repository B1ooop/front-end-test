import { Book } from './book';

export class Author {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public patronymic: string,
        public birthDate: Date,
        public books: Array<Book>
    ) { }
}