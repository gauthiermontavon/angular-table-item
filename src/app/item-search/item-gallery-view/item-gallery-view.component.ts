import { Component, OnInit, Input } from '@angular/core';


import { ItemDatasource } from "../../services/item-datasource";

@Component({
  selector: 'app-item-gallery-view',
  templateUrl: './item-gallery-view.component.html',
  styleUrls: ['./item-gallery-view.component.css']
})
export class ItemGalleryViewComponent implements OnInit {

  @Input('data')
  dataSource: ItemDatasource;

  constructor() { }

  ngOnInit() {

    this.dataSource.totalCount
  }

}