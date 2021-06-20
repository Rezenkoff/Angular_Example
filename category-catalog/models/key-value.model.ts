import { IDeserializable } from './IDeserializable';

export class KeyValueModel implements IDeserializable {

  public id: number;
  public value: string;

  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

