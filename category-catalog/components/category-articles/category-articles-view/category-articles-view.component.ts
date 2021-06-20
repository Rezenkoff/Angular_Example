import { Component, Input } from '@angular/core';
import { CategoryNodeModel } from '../../../models/category-node.model';

@Component({
  selector: 'category-articles-view',
  templateUrl: './category-articles-view.component.html'
})
export class CategoryArticlesViewComponent {

  @Input() public node: CategoryNodeModel;  
  constructor() { }
}
