import { IDeserializable } from './IDeserializable';
import { CategoryNodeModel } from './category-node.model';


export class CategoryModel implements IDeserializable {

  public parentNode: CategoryNodeModel = new CategoryNodeModel();
  public nodeChildren: Array<CategoryNodeModel> = new Array<CategoryNodeModel>();
   

  constructor(
       
  ) { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
