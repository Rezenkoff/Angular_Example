import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryNodeModel } from '../../models/category-node.model';
import { ParentKeyValueModel } from '../../models/parent-key-value.model';
import { CategoryNodeService } from '../../services/category-node.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'category-node-edit',
  templateUrl: './category-node-edit.component.html'
})

export class CategoryNodeEditComponent implements OnDestroy {
  public categoryEditFields: FormGroup;
  public parentId: FormControl;
  public nameRus: FormControl;
  public nameUkr: FormControl;
  public imageUrl: FormControl;
  public selectedNode: CategoryNodeModel = new CategoryNodeModel();
  public parentsNodesList: Array<ParentKeyValueModel> = [];
  private subs = new SubSink();

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryNodeEditComponent>,
    private _categoryNodeService: CategoryNodeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedNode = new CategoryNodeModel().deserialize(data.node);
    this.parentsNodesList = data.parentsList.map(i => new ParentKeyValueModel().deserialize(i));

    this.parentId = new FormControl(this.selectedNode.parentId);
    this.nameRus = new FormControl(this.selectedNode.nameRus, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]);
    this.nameUkr = new FormControl(this.selectedNode.nameUkr, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]);
    this.imageUrl = new FormControl(this.selectedNode.imageUrl, [Validators.required, Validators.pattern('http(s)?:.*.(jpeg|png|jpg|bmp)?')]);

    this.categoryEditFields = fb.group({
      parentId: this.parentId,
      nameRus: this.nameRus,
      nameUkr: this.nameUkr,
      imageUrl: this.imageUrl
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public save(): void {
    if (this.categoryEditFields.valid) {
      let result = {
        nodeId: this.selectedNode.nodeId,
        parentId: this.categoryEditFields.controls.parentId.value,
        nameRus: this.categoryEditFields.controls.nameRus.value,
        nameUkr: this.categoryEditFields.controls.nameUkr.value,
        imageUrl: this.categoryEditFields.controls.imageUrl.value,
        vogue: this.selectedNode.vogue
      };

      var request = new CategoryNodeModel().deserialize(result);
      this.subs.sink = this._categoryNodeService.updateNode(request).subscribe(resp => {
        if (resp.ok) {
          this.dialogRef.close(true);
        }
      }, error => {
        var err = error.json();
        var errKeys = Object.keys(err.errors);
        errKeys.forEach(key => { this.categoryEditFields.controls[key.charAt(0).toLowerCase() + key.slice(1)].setErrors({ 'notunique': true }) });
      });
    }
  }
}


