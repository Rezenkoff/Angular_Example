import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParentKeyValueModel } from '../../models/parent-key-value.model';
import { CategoryNodeModel } from '../../models/category-node.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'category-node-restore',
  templateUrl: './category-node-restore.component.html'
})
export class CategoryNodeRestoreComponent {

  public nodeItem: CategoryNodeModel;
  public parentNode: CategoryNodeModel;
  public parentsListObservable: Observable<Array<ParentKeyValueModel>>;
  public parentsNodesList: Array<ParentKeyValueModel> = [];
  public parentId: FormControl;
  public categoryRestoreFields: FormGroup;
  public subs: SubSink;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CategoryNodeRestoreComponent>) {

    this.subs = new SubSink();
    this.parentId = new FormControl('', Validators.required);    

    this.categoryRestoreFields = fb.group({
      parentId: this.parentId
    });

    this.nodeItem = new CategoryNodeModel().deserialize(data.nodeItem);
    this.parentNode = new CategoryNodeModel().deserialize(data.parentNode);    

    if (this.parentNode.isDeleted) {
      this.parentsListObservable = this.data.parentsListObservable as Observable<Array<ParentKeyValueModel>>;
      this.parentsListObservable.subscribe(parents => {
        this.parentsNodesList = parents.map(i => new ParentKeyValueModel().deserialize(i)); 
      })
    }    
  }

  public close(): void {
    this.dialogRef.close();
  }

  public restore(): void {
    this.dialogRef.close({
        restore: true,
        needNewParent: this.parentNode.isDeleted,
        newParentId: this.categoryRestoreFields.controls.parentId.value
    });
  }
}
