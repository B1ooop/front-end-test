import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAuthorComponent } from './new-author/new-author.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewAuthorComponent } from './view-author/view-author.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorDetailsComponent,
    NewAuthorComponent,
    EditBookComponent,
    ViewAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
