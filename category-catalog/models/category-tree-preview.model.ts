export class CategoryTreePreviewModel {

  public nodeId: number;
  public parentId: number;
  public nameRus: string;
  public nameUkr: string;
  public level: number;

  public children?: CategoryTreePreviewModel[];
}
