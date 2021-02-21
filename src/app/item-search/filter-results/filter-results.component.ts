import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FilterChipsComponent } from "../filter-chips/filter-chips.component";
@Component({
  selector: "app-filter-results",
  templateUrl: "./filter-results.component.html",
  styleUrls: ["./filter-results.component.css"]
})
export class FilterResultsComponent implements OnInit,AfterViewInit {
  showFilters: boolean;
  searchForm: FormGroup;
  @ViewChild(FilterChipsComponent)
  private filterChipsComponent: FilterChipsComponent;
  constructor() {
    this.searchForm = new FormGroup({
      global_search_term: new FormControl()
    });
  }

  ngOnInit() {
    this.showFilters = false;
  }
  ngAfterViewInit(){
   this.searchForm.addControl('childForm', this.filterChipsComponent.filterForm);
    this.filterChipsComponent.filterForm.setParent(this.searchForm);
}

 

  toggleFilters() {
    console.log("toggle filter");
    if (!this.showFilters) {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }

    console.log("toggle filter" + this.showFilters);
  }
}
