import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService } from '../../../../../../services/http-client.service';
import { ValidationModel } from '../models/validation.model';

@Injectable()
export class CategoryStructureManipulationService {

  constructor(private _httpClient: HttpClientService) { }

  public enableEditMode(): Observable<any> {
    return this._httpClient.get('ct/structuremanipulation/enable-edit-mode', true);
  }

  public cancelEditCatalog(): Observable<any> {
    return this._httpClient.get('ct/structuremanipulation/cancel-edit-catalog', true);
  }

  public validateCatalog(): Observable<ValidationModel> {
    return this._httpClient.get('ct/structuremanipulation/validate-catalog', true).pipe(map(resp => new ValidationModel().deserialize(resp.json())));
  }

  public applyNewCatalogStructure(): Observable<any> {
    return this._httpClient.get('ct/structuremanipulation/apply-new-catalog', true);
  }

  public restoreFromBackup(): Observable<any> {
    return this._httpClient.get('ct/structuremanipulation/restore-from-backup-catalog', true);
  }
}
