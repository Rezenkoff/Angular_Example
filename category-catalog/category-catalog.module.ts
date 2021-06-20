//--MODULES--//
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryCatalogRoutingModule } from './category-catalog-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule, MatDialogModule, MatTreeModule, MatPaginatorIntl } from '@angular/material'
import { CdkTreeModule } from '@angular/cdk/tree';
import { getRusPaginatorIntl } from './rus-paginator-intl';

//--COMPONENTS--//
import { CategoryCatalogComponent } from './components/category-catalog.component';
import { CategoryNavComponent } from './components/category-nav/category-nav.component';
import { CategoryNodeComponent } from './components/category-node/category-node.component';
import { CategoryTreeStateComponent } from './components/category-tree-state/category-tree-state.component';
import { CategoryArticlesViewComponent } from './components/category-articles/category-articles-view/category-articles-view.component';
import { CategoryArticlesComponent } from './components/category-articles/category-articles.component';
import { CategoryTreePreviewComponent } from './components/category-tree-preview/category-tree-preview.component';

//--SERVICES--//
import { CategoryNodeService } from './services/category-node.service';
import { CategoryNavService } from './services/category-nav.service';
import { CategoryTreeStateService } from './services/category-tree-state.service';
import { CategoryStructureManipulationService } from './services/category-structure-manipulation.service';
import { CategoryArticlesService } from './services/category-articles.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    CategoryCatalogRoutingModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTreeModule,
    CdkTreeModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  exports: [ MatSlideToggleModule ],
  declarations: [CategoryNodeComponent, CategoryCatalogComponent, CategoryNavComponent, CategoryTreeStateComponent, CategoryArticlesComponent, CategoryArticlesViewComponent, CategoryTreePreviewComponent ],
  entryComponents: [CategoryTreePreviewComponent ],
  providers: [CategoryNodeService, CategoryNavService, CategoryTreeStateService, CategoryStructureManipulationService, CategoryArticlesService, { provide: MatPaginatorIntl, useValue: getRusPaginatorIntl() }]
})
export class CategoryCatalogModule {

}
