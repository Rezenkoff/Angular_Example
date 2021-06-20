import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../../../../shared/guards/admin-guard';
import { CategoryNodeComponent } from './components/category-node/category-node.component';
import { CategoryCatalogComponent } from './components/category-catalog.component';
import { CategoryArticlesComponent } from './components/category-articles/category-articles.component';

const articlesCatalogChildernRoutes = [
  { path: 'node/:nodeId', canActivate: [AdminGuard], component: CategoryNodeComponent },
  { path: 'node', canActivate: [AdminGuard], component: CategoryNodeComponent },
  { path: 'node/node-articles/:nodeId', canActivate: [AdminGuard], component: CategoryArticlesComponent },
  { path: '', redirectTo: 'node/0', pathMatch: '*/category-catalog' }
];

const articlesCatalogRoutes: Routes = [
  { path: '', component: CategoryCatalogComponent, children: articlesCatalogChildernRoutes },

];
@NgModule({
  imports: [
    RouterModule.forChild(articlesCatalogRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoryCatalogRoutingModule {

}


