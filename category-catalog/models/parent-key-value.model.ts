import { IDeserializable } from './IDeserializable';
import { KeyValueModel } from './key-value.model';

export class ParentKeyValueModel implements IDeserializable {

  public groupName: string;
  public groupedParentNodes: KeyValueModel[];
  
  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

