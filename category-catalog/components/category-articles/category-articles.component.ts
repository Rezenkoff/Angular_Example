import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleItemModel } from '../../models/article-item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CategoryArticlesService } from '../../services/category-articles.service';
import { CategoryNavService } from '../../services/category-nav.service';
import { ArticleTypeModel } from '../../models/article-type.model';
import { HttpEventType } from '@angular/common/http';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryArticleEditComponent } from './category-article-edit/category-article-edit.component';

@Component({
  selector: 'category-articles',
  templateUrl: './category-articles.component.html'
})
export class CategoryArticlesComponent implements OnInit, OnDestroy, AfterViewInit {
  private subs: SubSink = new SubSink();
  public fileName: string = "";
  public displayedColumns: string[] = ['articleId', 'articleType', 'articleName', 'articleIsActive', 'articleSupplierId', 'cardNumber', 'articleInfo', 'measure', 'articleNameUkr'];

  public selectedNodeId: number = 0;
  public typesArt: Array<ArticleTypeModel> = new Array<ArticleTypeModel>();
  public selectedTypeValue: number = 0;
  public progress: number = 0;
  public dataSourceArticles: MatTableDataSource<ArticleItemModel>;
  public totalArticles: number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _categoryNavService: CategoryNavService,
    private _categoryArticlesService: CategoryArticlesService,
    private _router: ActivatedRoute) {
  }

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') input: ElementRef;

  public ngAfterViewInit() {

  }

  public openArticleCard(element: ArticleItemModel): void {
    const dialogRef = this._dialog.open<CategoryArticleEditComponent, ArticleItemModel>(CategoryArticleEditComponent, {
      height: '730px',
      width: '1200px',
      data: element
    });

    this.subs.sink = dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.selectedNodeId = +params['nodeId'];
      this.loadArticlesForNode();
      this._categoryNavService.$currentNodeChanged.next(this.selectedNodeId);
      this.subs.sink = this._categoryArticlesService.getNodeArticlesTypes().subscribe(types => {
        this.typesArt = types;
      });
    });
  }

  private loadArticlesForNode(): void {
    this.subs.sink = this._categoryArticlesService.getNodeArticlesById(this.selectedNodeId, this.selectedTypeValue).subscribe(articlesVm => {
      this.totalArticles = articlesVm.total;
      this.dataSourceArticles = new MatTableDataSource<ArticleItemModel>(articlesVm.articles);
      this.dataSourceArticles.paginator = this.paginator;
      this.dataSourceArticles.paginator.firstPage();
    }
    );
  }

  public onOpenFileClick(): void {
    this.progress = 0;
    this.input.nativeElement.click();
  }

  public typeChanged(event): void {
    this.selectedTypeValue = event.value;
    this.loadArticlesForNode();
  }

  public onFileSelected(files): void {
    this.progress = 0;

    this.subs.sink = this._categoryArticlesService.uploadArticlesFile(files).subscribe(event => {
      if (event && event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event && event.type === HttpEventType.Response) {
        this.fileName = files[0].name;
      }
    });
  }

  public onFileProccescClick(): void {
    this._categoryArticlesService.proccessUploadedFile(this.fileName, this.selectedNodeId).subscribe(response => { }, error => {
      if (error.status === 400) {
        const err = error.json();
        this._snackBar.open("Ошибка во время обработки файла:", err.errors["LOAD_FROM_FILE"][0]);
      }
    });
  }
}
