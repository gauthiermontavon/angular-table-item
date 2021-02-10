import { Component, OnInit } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef
} from "@angular/material/bottom-sheet";
@Component({
  selector: "app-tag-panel",
  templateUrl: "./tag-panel.component.html",
  styleUrls: ["./tag-panel.component.css"]
})
export class TagPanelComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheet,{
      autofocus:false
    });
  }

  ngOnInit() {}
}

@Component({
  selector: "bottom-sheet",
  templateUrl: "full-panel-bottom.html"
})
export class BottomSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
