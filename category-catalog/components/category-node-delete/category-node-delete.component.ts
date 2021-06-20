import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryNodeModel } from '../../models/category-node.model';

@Component({
  selector: 'category-node-delete',
  templateUrl: './category-node-delete.component.html'
})
export class CategoryNodeDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public categoryNode: CategoryNodeModel,
    private dialogRef: MatDialogRef<CategoryNodeDeleteComponent>) {

  }

  public close(): void {
    this.dialogRef.close();
  }

  public setDelete(): void {
    this.dialogRef.close(true);
  }
}
