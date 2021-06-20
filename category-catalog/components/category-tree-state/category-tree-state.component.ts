import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { CategoryStructureManipulationService } from '../../services/category-structure-manipulation.service';
import { CategoryTreeStateService } from '../../services/category-tree-state.service';
import { CategoryTreePreviewComponent } from '../category-tree-preview/category-tree-preview.component';
import { ValidationTreeStateComponent } from './validation-tree-state.component';
import { ValidationModel } from '../../models/validation.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'category-tree-state',
  templateUrl: './category-tree-state.component.html',
  styleUrls: ['./styles/category-tree-state.component__.scss']
})
export class CategoryTreeStateComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    private _snackBar: MatSnackBar,
    public categoryTreeState: CategoryTreeStateService,
    private _categoryStructureManipulationService: CategoryStructureManipulationService,
    private _matDialog: MatDialog) {
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public ngOnInit(): void {
    this.categoryTreeState.getTreeState();
  }

  public canBeRestored(): boolean {
    return this.categoryTreeState.currentState.restoreAval();
  }

  public enableEditMode(): void {
    this.subs.sink = this._categoryStructureManipulationService.enableEditMode().subscribe(response => {
      if (response.ok) {
        this.categoryTreeState.getTreeState();
        this.categoryTreeState.sendStateChanged();
      }
    });
  }

  public applyNewTreeStucture(): void {
    this.subs.sink = this._categoryStructureManipulationService.applyNewCatalogStructure().subscribe(response => {
      if (response.ok) {
        this.categoryTreeState.getTreeState();
        this.categoryTreeState.sendStateChanged();
      }
    });
  }

  public cancelEditCatalog(): void {
    this.subs.sink = this._categoryStructureManipulationService.cancelEditCatalog().subscribe(response => {
      if (response.ok) {
        this.categoryTreeState.getTreeState();
        this.categoryTreeState.sendStateChanged();
      }
    });
  }

  public validateCatalog(): void {
    this._categoryStructureManipulationService.validateCatalog().subscribe(response => {
      if (response.valid) {
        this._snackBar.open("Валидация дерева", "Дерево не содержит ошибок!",{ duration: 3 * 1000});
      } else {
        this._matDialog.open<ValidationTreeStateComponent, ValidationModel>(ValidationTreeStateComponent, {
          height: '500px',
          width: '800px',
          data: response
        })
      }
      this.categoryTreeState.setValidationState(response);
    });
  }

  public restoreFromBackUp(): void {
    this.subs.sink = this._categoryStructureManipulationService.restoreFromBackup().subscribe(response => {
      if (response.ok) {
        this.categoryTreeState.getTreeState();
      }
    });
  }

  public openTreePreview() {
    const dialogRef = this._matDialog.open(CategoryTreePreviewComponent);
    dialogRef.updateSize('80%');
  }
}
