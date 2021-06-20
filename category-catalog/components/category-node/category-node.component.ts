import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryNodeAddComponent } from '../category-node-add/category-node-add.component';
import { CategoryNodeEditComponent } from '../category-node-edit/category-node-edit.component';
import { CategoryNodeDeleteComponent } from '../category-node-delete/category-node-delete.component';
import { CategoryNodeRestoreComponent } from '../category-node-restore/category-node-restore.component';
import { CategoryNodeService } from '../../services/category-node.service';
import { CategoryNodeModel } from '../../models/category-node.model';
import { CategoryModel } from '../../models/category.model';
import { CategoryTreeStateService } from '../../services/category-tree-state.service';
import { CategoryNavService } from '../../services/category-nav.service';
import { CategoryTreeStateModel } from '../../models/category-tree-state.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'category-node',
  templateUrl: './category-node.component.html',
  styleUrls: ['./styles/category-node.component__.scss']

})
export class CategoryNodeComponent implements OnInit, OnDestroy {

  public currentState: CategoryTreeStateModel = new CategoryTreeStateModel();
  private _currentNodeId: number = 0;
  public currentNode: CategoryModel = new CategoryModel();
  public isLoading: boolean = false;
  private subs = new SubSink();

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _categoryNodeService: CategoryNodeService,
    public categoryTreeState: CategoryTreeStateService,
    private _categoryNavService: CategoryNavService,
    public dialog: MatDialog
  ) {
    categoryTreeState.$stateChangedSubject.subscribe(state => {
      this.getCurrentNodeById();
    });
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._currentNodeId = +params['nodeId'];
      this._categoryNavService.$currentNodeChanged.next(this._currentNodeId);

      this.getCurrentNodeById();
    });
  }

  private getCurrentNodeById(): void {
    this.isLoading = true;
    this.subs.sink = this._categoryNodeService.getNodebyId(this._currentNodeId).subscribe(node => {
      this.currentNode = node;
      this.isLoading = false;      
    });
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public openDeleteDialog(node: CategoryNodeModel): void {
    const dialogRef = this.dialog.open<CategoryNodeDeleteComponent, CategoryNodeModel, boolean>(CategoryNodeDeleteComponent, {
      height: '200px',
      width: '400px',
      data: node
    });

    this.subs.sink = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setIsDeleted(node);
      }
    });
  }

  public openRestoreDialog(node: CategoryNodeModel): void {

    const dialogRef = this.dialog.open<CategoryNodeRestoreComponent, any>(CategoryNodeRestoreComponent, {
      height: '400px',
      width: '400px',
      data: {
        nodeItem: node,
        parentNode: this.currentNode.parentNode,
        parentsListObservable: this._categoryNodeService.getPosibleParentsList(node.nodeId)
      }
    });

    this.subs.sink = dialogRef.afterClosed().subscribe(result => {
      if (result && result.restore) {
        if (result.needNewParent) {
          node.parentId = result.newParentId;
          this.subs.sink = this._categoryNodeService.updateNode(node).subscribe(resp => {
            if (resp.ok) {
              this.setIsDeleted(node);
              this.getCurrentNodeById();
            }
          });
        } else {
          this.setIsDeleted(node);
        }
      }
    });
  }

  private setIsDeleted(node: CategoryNodeModel) {
    let isDeleted = !node.isDeleted;
    this.subs.sink = this._categoryNodeService.setDeleteNode(node.nodeId, isDeleted).subscribe(resp => {
      if (resp.ok)
        node.isDeleted = isDeleted;
    })
  }

  public openEditDialog(node: CategoryNodeModel): void {

    this.subs.sink = this._categoryNodeService.getPosibleParentsList(node.nodeId).subscribe(parents => {

      const dialogRef = this.dialog.open(CategoryNodeEditComponent, {
        height: '700px',
        width: '800px',
        data: { node: node, parentsList: parents }
      });

      this.subs.sink = dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getCurrentNodeById();
        }
      });
    });
  }

  public openAddDialog(): void {

    const dialogRef = this.dialog.open(CategoryNodeAddComponent, {
      height: '600px',
      width: '800px',
      data: { parentNode: this.currentNode.parentNode }
    });

    this.subs.sink = dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.getCurrentNodeById();
    });
  }

  public canAddChild(): Boolean {
    return this.currentNode.parentNode.level == 4;
  }
}
