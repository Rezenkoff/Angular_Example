import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeNavModel } from '../../models/node-nav.model';
import { CategoryNavService } from '../../services/category-nav.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'category-nav',
  templateUrl: './category-nav.component.html'
})
export class CategoryNavComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  public path: Array<NodeNavModel> = new Array<NodeNavModel>();

  constructor(private _categoryNavService: CategoryNavService) {
    this.subs.sink = this._categoryNavService.$currentNodeChanged.subscribe(nodeId => {
      this.subs.sink = this._categoryNavService.getNodePath(nodeId).subscribe(path =>
        this.path = path);
    });
  }
  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public ngOnInit(): void {

  }
}
