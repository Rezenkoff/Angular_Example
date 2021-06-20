import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService } from '../../../../../../services/http-client.service';
import { CategoryArticleModel } from '../models/category-article.model';
import { ArticleTypeModel } from '../models/article-type.model';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class CategoryArticlesService {
  constructor(
    private _httpClient: HttpClientService, private _http: HttpClient) {
  }

  public getNodeArticlesById(nodeId: number, typeId: number): Observable<CategoryArticleModel> {

    return this._httpClient.get('ct/catalognodearticle/get-node-articles', true, { "nodeId": nodeId, "typeId": typeId }, null)
      .pipe(map(response => {
        const data = new CategoryArticleModel().deserialize(response.json());
        return data;
      }));
  }

  public getNodeArticlesTypes(): Observable<Array<ArticleTypeModel>> {
    return this._httpClient.get('ct/catalognodearticle/get-articles-types', true, null, null)
      .pipe(map(response => {
        const data = response.json();
        return data.map(i => new ArticleTypeModel().deserialize(i));
      }))
  }

  public uploadArticlesFile(files): Observable<HttpEvent<Object>> {
    if (files.length === 0) {
      return empty();
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this._http.post(environment.apiUrl + '/ct/catalognodearticle/upload-articles-batch', formData, { reportProgress: true, observe: 'events' });
  }

  public proccessUploadedFile(fileName: string, categoryId: number): Observable<any> {
    return this._httpClient.get('ct/catalognodearticle/proccess-uploaded-file', true, { "fileName": fileName, "categoryId": categoryId }, null);
  }
}
