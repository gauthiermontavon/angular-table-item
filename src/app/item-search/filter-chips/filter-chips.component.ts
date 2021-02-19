import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-filter-chips",
  templateUrl: "./filter-chips.component.html",
  styleUrls: ["./filter-chips.component.css"]
})
export class FilterChipsComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filterCtrl = new FormControl();
  filteredObjs: Observable<string[]>;

  label: string;
  placeholder: string;

  selection: string[] = ["Lemon"];
  all: string[] = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];
  

  @ViewChild("objInput") objInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  constructor() {
    this.filteredObjs = this.filterCtrl.valueChanges.pipe(
      startWith(null),
      map((obj: string | null) => (obj ? this._filter(obj) : this.all.slice()))
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.selection.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.filterCtrl.setValue(null);
  }

  remove(obj: string): void {
    const index = this.selection.indexOf(obj);

    if (index >= 0) {
      this.selection.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selection.push(event.option.viewValue);
    this.objInput.nativeElement.value = "";
    this.filterCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.all.filter(
      selection => selection.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
