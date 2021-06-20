import { IDeserializable } from './IDeserializable';

export class ArticleItemModel implements IDeserializable {

  public articleId: number;
  public articleType: number;
  public articleName: string;
  public articleIsActive: boolean;
  public articleSupplierId: number;
  public cardNumber: string;
  public articleInfo: string;
  public measure: string;
  public articleNameUkr: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}



        
