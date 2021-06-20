import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryTreeStateModel } from '../models/category-tree-state.model';
import { HttpClientService } from '../../../../../../services/http-client.service';
import { Subject } from 'rxjs';
import { ValidationModel } from '../models/validation.model';

@Injectable()
export class CategoryTreeStateService {

  public $stateChangedSubject: Subject<CategoryTreeStateModel> = new Subject<CategoryTreeStateModel>();
  public currentState: CategoryTreeStateModel = new CategoryTreeStateModel();

  constructor(private _httpClient: HttpClientService) {    
  }

  public getTreeState(): void {
    this._httpClient.get('ct/catalogtree/catalog-tree-state', true)
      .pipe(map(response => {
        this.currentState = new CategoryTreeStateModel().deserialize(response.json());        
      })).subscribe();
  }  

  public setValidationState(model: ValidationModel): void {
    this.currentState.validation = model;
    this.sendStateChanged();
  }

  public sendStateChanged(): void {
    this.$stateChangedSubject.next(this.currentState);
  }
}
