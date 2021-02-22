import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit
} from "@angular/core";

import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map
} from "rxjs/operators";

@Component({
  selector: "app-filter-chips",
  templateUrl: "./filter-chips.component.html",
  styleUrls: ["./filter-chips.component.css"]
})
export class FilterChipsComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredObjs: Observable<string[]>;

  label: string;
  placeholder: string;

  selection: string[] = ["Lemon"];
  all: string[] = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];

  filterForm: FormGroup;

  @ViewChild("objInput") objInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  constructor() {
    this.filterForm = new FormGroup({
      tag_filter: new FormControl()
    });

    this.all.slice();

    this.filteredObjs = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((obj: string | null) => (obj ? this._filter(obj) : this.all.slice()))
    );
  }

  ngOnInit() {
    this.selection = [];
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
  }

  add(event: MatChipInputEvent): void {
    console.log("ADDD");
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.selection.push(value.trim());
      //can't link chips list to form control, so lets do it manually
      this.filterForm.controls.tag_filter.setValue(this.selection.toString());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.tagCtrl.setValue(null);
  }

  remove(obj: string): void {
    const index = this.selection.indexOf(obj);

    if (index >= 0) {
      this.selection.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("SELECTEDDD");
    this.selection.push(event.option.viewValue);
    this.objInput.nativeElement.value = "";
    this.tagCtrl.setValue(null);
    //can't link chips list to form control, so lets do it manually
    this.filterForm.controls.tag_filter.setValue(this.selection.toString());
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.all.filter(
      selection => selection.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
