import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-filter-results",
  templateUrl: "./filter-results.component.html",
  styleUrls: ["./filter-results.component.css"]
})
export class FilterResultsComponent implements OnInit {
  showFilters: boolean;
  searchForm : FormGroup;

  colorControl = new FormControl("primary");
  fontSizeControl = new FormControl(16);

  //@ViewChild("input") input: ElementRef;

  constructor() {
    this.searchForm = new FormGroup({
        global_search_term: new FormControl(),
        source_filter : new FormControl(),
        date_filter : new FormControl(),
        tags_filter: new FormControl()

    });
  }

  ngOnInit() {
    this.showFilters = false;
  }

  toggleFilters() {
    console.log("toggle filter");
    if(!this.showFilters){
      this.showFilters = true;
    }
    else{
      this.showFilters = false;
    }

    console.log("toggle filter" + this.showFilters);
  }
}
