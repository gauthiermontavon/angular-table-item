import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

import { Item } from "../../interfaces/item";

@Component({
  selector: "item-dialog",
  templateUrl: "./item-dialog.component.html",
  styleUrls: ["./item-dialog.component.css"]
})
export class ItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
