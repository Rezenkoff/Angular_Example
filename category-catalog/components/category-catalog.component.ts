import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FindCategoryNodeModel } from '../models/find-category-node.model';
import { CategoryNodeService } from '../services/category-node.service';

@Component({
  selector: 'category-catalog',
  templateUrl: './category-catalog.component.html'
})
export class CategoryCatalogComponent implements OnInit {

  public searchText: string = '';
  public searchText$: Subject<string> = new Subject<string>();
  public foundNodes: FindCategoryNodeModel[] = [];

  constructor(private _categoryNodeService: CategoryNodeService, private _router: Router) { }

  ngOnInit() {
    this.initSearch();
  }

  public changeSearchText() {
    this.searchText$.next(this.searchText);
  }

  public navigateToNode(nodeId: number) {
    this._router.navigate(['admin', 'category-catalog', 'node', nodeId]);
  }

  private initSearch() {
    this.searchText$.pipe(debounceTime(1500))
      .subscribe(x => this.searchNodes(x));
  }

  private searchNodes(searchText: string) {
    this.foundNodes = [];
    this._categoryNodeService.findNodes(searchText).subscribe(x => this.foundNodes = x.result);
  }
}
