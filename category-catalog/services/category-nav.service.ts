import { Injectable } from '@angular/core';
import { NodeNavModel } from '../models/node-nav.model';
import { Observable, Subject } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { HttpClientService } from '../../../../../../services/http-client.service';

@Injectable()
export class CategoryNavService {

  public $currentNodeChanged: Subject<number> = new Subject<number>();

  constructor(
    private _httpClient: HttpClientService) {
  }

  public getNodePath(nodeId: number): Observable<Array<NodeNavModel>> {
    return this._httpClient.get('ct/catalognode/get-node-path', true, { "nodeId": nodeId }, null)
      .pipe(map(response => {
        let data = response.json();
        return data.map(i => new NodeNavModel().deserialize(i));
      }));
  }
}
