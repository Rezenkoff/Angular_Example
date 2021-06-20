import { IDeserializable } from './IDeserializable';

export class ArticleTypeModel implements IDeserializable {
  public typeId: number;
  public typeName: string;

  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
