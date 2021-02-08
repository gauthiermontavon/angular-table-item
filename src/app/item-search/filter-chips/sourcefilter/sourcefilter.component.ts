import { Component, OnInit } from "@angular/core";
import { FilterChipsComponent } from "../filter-chips.component";

@Component({
  selector: "app-sourcefilter",
  templateUrl: "../filter-chips.component.html",
  styleUrls: ["../filter-chips.component.css"]
})
export class SourcefilterComponent extends FilterChipsComponent {
  constructor() {
    super();
  }

  ngOnInit() {
    this.label = "My source";
    this.placeholder = "new source...";

    this.selection = ["Canon"];
    this.all = ["Canon", "Canon 100", "Huawei", "Samsung"];
  }
}
