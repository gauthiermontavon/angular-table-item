import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../../interfaces/item";
import { ItemDatasource } from "../../services/item-datasource";

@Component({
  selector: "app-item-gallery-view",
  templateUrl: "./item-gallery-view.component.html",
  styleUrls: ["./item-gallery-view.component.css"]
})
export class ItemGalleryViewComponent implements OnInit {
 
 
 
 @Input("data")
  dataSource: ItemDatasource;
  itemsList: Item[];

  constructor() {}

  ngOnInit() {
    console.log("INIT gallery:" + this.dataSource);

    this.dataSource.itemsSubject.subscribe(val => {
      this.itemsList = val;
      val.forEach(item => {
        console.log("item.id" + item.id);
        console.log("item.title" + item.title);
      });
      console.log("subscribe itemsSubject of datssoure:" + val);
    });
  }

  selectItem(item: Item, event?: Event) {
    //TODO: si la touch Shift n'est pas enfoncé
    document
      .getElementById("hono-gallery-items")
      .querySelectorAll("mat-grid-tile.selected")
      .forEach(elm => {
        elm.classList.remove("selected");
      });
    var htmlElem = event.target as HTMLElement;
    htmlElem.closest("mat-grid-tile").classList.add("selected");
    if (event) {
      event.stopPropagation();
    }
  }
}
