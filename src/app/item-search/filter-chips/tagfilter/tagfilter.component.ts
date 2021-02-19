import { Component, OnInit } from "@angular/core";
import { FilterChipsComponent } from "../filter-chips.component";
import { ItemService } from "../../../services/item.service";

@Component({
  selector: "app-tagfilter",
  templateUrl: "../filter-chips.component.html",
  styleUrls: ["../filter-chips.component.css"]
})
export class TagfilterComponent extends FilterChipsComponent {
  constructor(private itemService: ItemService) {
    super();
  }

  ngOnInit() {
    this.label = "Tags";
    this.placeholder = "nouveau tag";
    this.all = [
      "travail",
      "banque",
      "assurance",
      "maison",
      "contrat",
      "voiture"
    ];

    /*this.itemService.getTagsUsed().subscribe(tags => {
      for (let tag of tags.usedTags) {
        //this.all.push(tag);
      }
      console.log("this.all content in subscribe:" + this.all);
    });
    console.log("this.all content:" + this.all);
    this.selection = ["travail"];*/
  }
}
