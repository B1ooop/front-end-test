import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { NewAuthorComponent } from './new-author/new-author.component';
import { ViewAuthorComponent } from './view-author/view-author.component';

const routes: Routes = [
  {
    path: "addAuthor",
    component: NewAuthorComponent
  },
  {
    path: "editAuthor/:id",
    component: AuthorDetailsComponent,
    children: [
      /*  {
         path: "book/:id"
       } */
    ]
  },

  {
    path: "viewAuthor/:id",
    component: ViewAuthorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
