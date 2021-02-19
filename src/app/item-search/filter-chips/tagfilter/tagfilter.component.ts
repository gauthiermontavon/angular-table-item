import { Component, OnInit } from "@angular/core";
import { FilterChipsComponent } from "../filter-chips.component";
import { ItemService } from "../../services/item.service";

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

    this.itemService.getTagsUsed().subscribe((tags: String[]) => {
      console.log("nb elements tag" + tags.length);
    });

    this.selection = ["travail"];
    this.all = [
      "travail",
      "banque",
      "assurance",
      "maison",
      "contrat",
      "voiture"
    ];
  }
}
