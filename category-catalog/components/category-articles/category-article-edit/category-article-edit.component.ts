import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleItemModel } from '../../../models/article-item.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'category-article-edit',
  templateUrl: './category-article-edit.component.html'
})
export class CategoryArticleEditComponent {

  public articleEditFields: FormGroup;
  public articleName: FormControl;
  public articleNameUkr: FormControl;
  public articleInfo: FormControl;
  public measure: FormControl;
  public articleIsActive: FormControl;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public article: ArticleItemModel,
    private dialogRef: MatDialogRef<CategoryArticleEditComponent>) {

    this.articleName = new FormControl(this.article.articleName);
    this.articleNameUkr = new FormControl(this.article.articleNameUkr);
    this.articleInfo = new FormControl(this.article.articleInfo);
    this.measure = new FormControl(this.article.measure);
    this.articleIsActive = new FormControl(this.article.articleIsActive);

    this.articleEditFields = fb.group({
      articleName: this.articleName,
      articleNameUkr: this.articleNameUkr,
      articleInfo: this.articleInfo,
      measure: this.measure,
      articleIsActive: this.articleIsActive
    });
  }

  public save(): void {

  }

  public close(): void {
    this.dialogRef.close();
  }
}
