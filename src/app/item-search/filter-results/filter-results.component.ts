import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-filter-results",
  templateUrl: "./filter-results.component.html",
  styleUrls: ["./filter-results.component.css"]
})
export class FilterResultsComponent implements OnInit {
  options: FormGroup;
  colorControl = new FormControl("primary");
  fontSizeControl = new FormControl(16);

  @ViewChild("input") input: ElementRef;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: this.colorControl,
      fontSize: this.fontSizeControl
    });
  }

  ngOnInit() {}
}
