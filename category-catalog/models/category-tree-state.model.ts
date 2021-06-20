import { IDeserializable } from './IDeserializable';
import { ValidationModel } from './validation.model';

export class CategoryTreeStateModel implements IDeserializable {

  public catalogVersion: number = 0;
  public backupVersion: number = 0;
  public catalogDboVersion: number = 0;
  public mode: number = 0;
  public validation: ValidationModel = new ValidationModel();

  public get CatalogVersion(): number {
    return this.catalogVersion;
  }

  public get Mode(): string {
    return this.mode == -1 ? 'EDIT' : 'APPLIED'
  }

  public get IsEditMode(): boolean {
    return this.mode == -1;
  }

  public restoreAval(): boolean {
    return this.catalogDboVersion != this.catalogVersion;
  }
    
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
