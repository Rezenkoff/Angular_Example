import { IDeserializable } from './IDeserializable';

export class ValidationModel implements IDeserializable {
  
  public valid: boolean;
  public errorDescription: string = "";
  public invalidNodesList: Array<number> = [];
  public invalidNodesNameList: Array<string> = [];
  public errorTitle: string = "";

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
