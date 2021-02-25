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
  galleryTypeFile: string;
  selectedItemIndex: number;
  pdfSource ="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
 

  constructor() {}

  ngOnInit() {
    this.selectedItemIndex = 0;
    console.log("INIT gallery:" + this.dataSource);
    this.galleryTypeFile = "";
    this.dataSource.itemsSubject.subscribe(val => {
      this.itemsList = val;
      val.forEach(item => {
        let extension = item.path.substring(
          item.path.lastIndexOf(".") + 1,
          item.path.length
        );
        if (
          this.galleryTypeFile.length > 0 &&
          extension != this.galleryTypeFile
        ) {
          alert("WARN HYBRIDE GALLERY");
        }
        //if (item.path.substring(item.path.lastIndexOf('.'),item.path.length)
        console.log("item.id" + item.id);
        console.log("item.title" + item.title);
        console.log(
          "gallery mode is : " +
            item.path.substring(
              item.path.lastIndexOf(".") + 1,
              item.path.length
            )
        );
      });
      console.log("subscribe itemsSubject of datssoure:" + val);
    });
  }

  selectItem(index: number, event?: Event) {
    console.log("index selected" + index);
    this.selectedItemIndex = index;
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

  getFileTypeForItem(index: number): string {
    console.log("getFileTypeForItem:" + this.itemsList[index].path.substring(
      this.itemsList[index].path.lastIndexOf("."),
      this.itemsList[index].path.length
    ));
    return this.itemsList[index].path.substring(
      this.itemsList[index].path.lastIndexOf(".")+1,
      this.itemsList[index].path.length
    );
  }

}
