import { Component, OnInit } from '@angular/core';
import { BooksService } from './../../services/books/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any;
  isLoading: boolean = false;

  constructor(
    private booksService: BooksService,
  ) { }

  ngOnInit() {
    this.isHandleLoading(true);
    this.booksService.getBooks().subscribe(
      response => {
        this.books = response;
        this.isHandleLoading(false);
      },
      (error: Response) => {
        this.isHandleLoading(false);
        console.log('error : ', error)
      });
  }

  isHandleLoading(status) {
    return this.isLoading = status;
  }

  addBook() {

  }

}
