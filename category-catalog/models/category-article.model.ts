import { IDeserializable } from './IDeserializable';
import { ArticleItemModel } from './article-item.model';

export class CategoryArticleModel implements IDeserializable {
  public articles: Array<ArticleItemModel>; 
  public total: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
