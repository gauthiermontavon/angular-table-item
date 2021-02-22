import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FilterChipsComponent } from "../filter-chips/filter-chips.component";
@Component({
  selector: "app-filter-results",
  templateUrl: "./filter-results.component.html",
  styleUrls: ["./filter-results.component.css"]
})
export class FilterResultsComponent implements OnInit, AfterViewInit {
  showFilters: boolean;
  searchForm: FormGroup;
  //ViewChildren instead of ViewChild (conditionnal display ngIf)
  //https://stackoverflow.com/questions/48321568/viewchild-returns-undefined
  @ViewChildren(FilterChipsComponent)
  private filterChComponent: QueryList<FilterChipsComponent>;

  constructor() {
    this.searchForm = new FormGroup({
      global_search_term: new FormControl()
    });
  }

  ngOnInit() {
    this.showFilters = false;
  }
  ngAfterViewInit() {
   
    this.filterChComponent.changes.subscribe(
      (comps: QueryList<FilterChipsComponent>) => {
        // Now you can access to the child component
        console.log("ngAfterViewInit - filterChComponent is now available");
        console.log("this.filterch check:" + this.filterChComponent);
        console.log("typeof:" + typeof this.filterChComponent);
        if (this.filterChComponent) {
          comps.forEach(element => {
            console.log("typeof:" + typeof element);
            console.log("element.filterForm"+element.filterForm);

            this.searchForm.addControl(
              "childForm",
              element.filterForm
            );
            element.filterForm.setParent(this.searchForm);
        
          });

         }
       
      }
    );
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
