import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryNodeModel } from '../../models/category-node.model';
import { CategoryNodeService } from '../../services/category-node.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'category-node-add',
  templateUrl: './category-node-add.component.html'
})

export class CategoryNodeAddComponent implements OnDestroy {
  public categoryFields: FormGroup;
  public parentId: FormControl;
  public nameRus: FormControl;
  public nameUkr: FormControl;
  public imageUrl: FormControl;
  public parent: CategoryNodeModel;
  private subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryNodeAddComponent>,
    private _categoryNodeService: CategoryNodeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.parent = new CategoryNodeModel().deserialize(data.parentNode);

    this.parentId = new FormControl({ value: `${this.parent.nodeId}  ${this.parent.nameRus}`, disabled: true });
    this.nameRus = new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(200)]);
    this.nameUkr = new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(200)]);
    this.imageUrl = new FormControl("", [Validators.required, Validators.pattern('http(s)?:.*.(jpeg|png|jpg|bmp)?')]);

    this.categoryFields = fb.group({
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
    if (this.categoryFields.valid) {
      let result = {
        parentId: this.parent.nodeId,
        nameRus: this.categoryFields.controls.nameRus.value,
        nameUkr: this.categoryFields.controls.nameUkr.value,
        imageUrl: this.categoryFields.controls.imageUrl.value
      };

      this.subs.sink = this._categoryNodeService.createNode(result).subscribe(nodeId => {
        if (nodeId) {
          this.dialogRef.close(result);
        }
      }, error => {
          var err = error.json();
          var errKeys = Object.keys(err.errors);
          errKeys.forEach(key => { this.categoryFields.controls[key.charAt(0).toLowerCase() + key.slice(1)].setErrors({ 'notunique': true }) });
      });
    }
  }
}


