import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationModel } from '../../models/validation.model';

@Component({
  selector: 'validation-tree-state',
  templateUrl: './validation-tree-state.component.html'
})

export class ValidationTreeStateComponent  {
  constructor(
    @Inject(MAT_DIALOG_DATA) public validationData: ValidationModel,
    private dialogRef: MatDialogRef<ValidationTreeStateComponent>) {

  }

  public close(): void {
    this.dialogRef.close();
  }
}
