import { ICatalogNodeSimpleModel } from './icatalog-node-simple-model.interface';
import { IDeserializable } from './IDeserializable';

export class CatalogNodeSimpleModel implements IDeserializable, ICatalogNodeSimpleModel {

  level: number;
  nameRus: string;
  nodeId: number;
  parentId: number;
  isDeleted: boolean; 

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
