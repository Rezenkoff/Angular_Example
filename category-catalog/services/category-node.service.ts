import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService } from '../../../../../../services/http-client.service';
import { CategoryModel } from '../models/category.model';
import { CategoryNodeModel } from '../models/category-node.model';
import { CategoryNodeCreateModel } from '../models/category-node-create.model';
import { ParentKeyValueModel } from '../models/parent-key-value.model';

@Injectable()
export class CategoryNodeService {

  constructor(
    private _httpClient: HttpClientService) {
  }

  public getNodebyId(nodeId: number): Observable<CategoryModel> {
    return this._httpClient.get('ct/catalognode/get-node-by-id', true, { "nodeId": nodeId }, null)
      .pipe(map(response => new CategoryModel().deserialize(response.json()) ));
  }

  public createNode(request: CategoryNodeCreateModel): Observable<any> {
    return this._httpClient.post('ct/catalognode/create-node', JSON.stringify(request), true);
  }

  public getPosibleParentsList(nodeId: number): Observable<Array<ParentKeyValueModel>> {
    return this._httpClient.get('ct/catalognode/get-posible-parents-list', true, { "nodeId": nodeId }, null)
      .pipe(map(response => response.json().map(i => new ParentKeyValueModel().deserialize(i))));
  }

  public updateNode(request: CategoryNodeModel): Observable<any> {
    return this._httpClient.put(`ct/catalognode/update-node/${request.nodeId}`, JSON.stringify(request), true);
  }

  public setDeleteNode(nodeId: number, isDeleted: boolean): Observable<any> {
    return this._httpClient.put(`ct/catalognode/set-delete-node`, JSON.stringify({ "NodeId": nodeId, IsDeleted: isDeleted}), true);
  }

  public findNodes(searchText: string): Observable<any> {
    return this._httpClient.get('ct/catalognode/find-nodes', true, { "text": searchText }, null)
      .pipe(map(response => response.json()));
  }

  public getCategoryNodeForPreview(): Observable<any> {
    return this._httpClient.get('ct/catalognode/get-category-tree-for-preview', true, { }, null)
      .pipe(map(response => response.json()));
  }
}
