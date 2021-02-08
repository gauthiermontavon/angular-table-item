import { Component, OnInit } from "@angular/core";
import { FilterChipsComponent } from "../filter-chips.component";

@Component({
  selector: "app-datefilter",
  templateUrl: "../filter-chips.component.html",
  styleUrls: ["../filter-chips.component.css"]
})
export class DatefilterComponent extends FilterChipsComponent {
  constructor() {
    super();
  }

  ngOnInit() {
    this.label = "Dates";
    this.placeholder = "nouvelle date";

    this.selection = ["01.2021"];
    this.all = ["01.2021", "02.2021", "03.2021"];
  }
}
