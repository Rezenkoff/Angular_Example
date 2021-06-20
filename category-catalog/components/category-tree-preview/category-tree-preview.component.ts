import { Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AlertService } from "../../../../../../../services";
import { CategoryTreePreviewModel } from "../../models/category-tree-preview.model";
import { CategoryNodeService } from "../../services/category-node.service";
import { NestedTreeControl } from '@angular/cdk/tree';
import { of } from "rxjs";

@Component({
  selector: 'category-tree-preview',
  templateUrl: 'category-tree-preview.component.html',
})
export class CategoryTreePreviewComponent implements OnInit {

  public treeControl = new NestedTreeControl<CategoryTreePreviewModel>(node => of(node.children));
  public dataSource = new MatTreeNestedDataSource<CategoryTreePreviewModel>();
  public isLoading: boolean = true;

  constructor(private _categoryNodeService: CategoryNodeService, private _alertService: AlertService) { }

  ngOnInit() {
    this._categoryNodeService.getCategoryNodeForPreview().subscribe(result => this.initNodes(result.result));
  }

  public hasChild = (_: number, node: CategoryTreePreviewModel) => !!node.children && node.children.length > 0;

  private initNodes(nodes: CategoryTreePreviewModel[]) {
    let mainNode = nodes.find(x => x.nodeId === 0);
    if (!mainNode) {
      this._alertService.error('Something went wrong. Please try later');
      return;
    }

    this.fillChildernNodes(mainNode, nodes);
    this.dataSource.data = mainNode.children;
    this.isLoading = false;
  }

  private fillChildernNodes(node: CategoryTreePreviewModel, nodes: CategoryTreePreviewModel[]) {
    node.children = nodes.filter(x => x.parentId === node.nodeId);
    for (let i = 0; i < node.children.length; i++) {
      this.fillChildernNodes(node.children[i], nodes);
    }
  }
}
