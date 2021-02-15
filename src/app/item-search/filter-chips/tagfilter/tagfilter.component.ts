import { Component, OnInit } from "@angular/core";
import { FilterChipsComponent } from "../filter-chips.component";

@Component({
  selector: "app-tagfilter",
  templateUrl: "../filter-chips.component.html",
  styleUrls: ["../filter-chips.component.css"]
})
export class TagfilterComponent extends FilterChipsComponent {
  constructor() {
    super();
  }

  ngOnInit() {
    this.label = "Tags";
    this.placeholder = "nouveau tag";

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
