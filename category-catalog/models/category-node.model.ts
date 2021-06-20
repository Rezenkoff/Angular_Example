import { IDeserializable } from './IDeserializable';
import { ICatalogNodeSimpleModel } from './icatalog-node-simple-model.interface';

export class CategoryNodeModel implements IDeserializable, ICatalogNodeSimpleModel {

  public level: number;
  public nameRus: string = "CATALOG";
  public nameUkr: string = "CATALOG";
  public nodeId: number;
  public parentId: number = null;
  public imageUrl: string = "";
  public vogue: number;
  public isDeleted: boolean;
  //public articlesCount: number;

  constructor() { }

  get Vogue(): boolean {
    return !!this.vogue;
  }

  set Vogue(value: boolean) {
    this.vogue = value ? 1 : 0;
  }

  get IsDeleted(): number {
    return this.isDeleted ? 1 : 0;
  }

  deserialize(input: any) {
    Object.assign(this, input);
      return this;
    }
}



