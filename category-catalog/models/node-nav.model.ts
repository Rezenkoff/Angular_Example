import { IDeserializable } from './IDeserializable';

export class NodeNavModel implements IDeserializable {

  public nodePathId: number;
  public nodePathName: string;

  constructor(

  ) { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
