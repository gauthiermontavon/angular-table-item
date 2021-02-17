import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit
} from "@angular/core";
import { Item } from "../interfaces/item";
import { ItemService } from "../services/item.service";
import { interval, Observable, fromEvent } from "rxjs";

import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay
} from "rxjs/operators";
import { ItemDatasource } from "../services/item-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { FilterResultsComponent } from "./filter-results/filter-results.component";
//FIXME: deja importé dans appmodule, donc...?
import { ItemDialogComponent } from "./item-dialog/item-dialog.component";

@Component({
  selector: "app-item-search",
  templateUrl: "./item-search.component.html",
  styleUrls: ["./item-search.component.css"]
})
export class ItemSearchComponent implements AfterViewInit, OnInit {
  item: Item;
  displayedColumns: string[] = [
    "id",
    "title",
    "path",
    "author",
    "date",
    "actions"
  ];
  defaultPageSize: number = 5;

  dataSource: ItemDatasource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(FilterResultsComponent)
  private filterComponent: FilterResultsComponent;

  constructor(private itemService: ItemService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new ItemDatasource(this.itemService);
    this.dataSource.loadItems("", "asc", 0, this.defaultPageSize);
  }

  ngAfterViewInit() {
    this.filterComponent.searchForm.valueChanges
      .pipe(
        tap(val => console.log("value serach CHANGED !!!" + val)),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadItemsPage();
        })
      )
      .subscribe();

    // server-side search
    /* fromEvent(this.filterComponent.input.nativeElement, "keyup")
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadItemsPage();
        })
      )
      .subscribe();*/

    this.paginator.page.pipe(tap(() => this.loadItemsPage())).subscribe();
  }

  loadItemsPage() {
    /*this.dataSource.loadItems(
      this.filterComponent.input.nativeElement.value,
      "asc",
      this.paginator.pageIndex,
      this.paginator.pageSize
    );*/
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "250px";
    dialogConfig.data = { id: 1, title: "test" };

    const dialogRef = this.dialog.open(ItemDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      //this.animal = result;
    });
  }

  onCreateRecord(): void {
    console.log("create click");
    /*const dialogRef = this.dialog.open(AvEditorComponent, {
      minWidth: '450px',
      height: '75vh',
      // 13.06.2018 panelClass to set width and height was KO
      data: {dataColumns: this.dataColumns}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (this.transaction) {
          this.transaction.emit(result);
        }
      }
    );*/
  }

  onEditRecord(): void {
    console.log("edit click");
    this.openDialog();
    /*const dialogRef = this.dialog.open(AvEditorComponent, {
      minWidth: '450px',
      maxHeight: '75vh',
      // 13.06.2018 panelClass to set width and height was KO
      data: {dataColumns: this.dataColumns, edited: this.selectedRows[0]}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        // return the object updated/created in the form to a transaction manager
        if (this.transaction) {
          this.transaction.emit(result);
        }
      }
    );*/
  }

  onDelete(): void {
    /*if (!this.demoMode) {
      const dialogRef = this.dialog.open(AvConfirmDialogComponent, {
        minWidth: '450px',
        maxHeight: '75vh'
      });

      dialogRef.afterClosed().subscribe(
        result => {
          switch (result) {
            case AvConfirmDialogResponseType.OK: {
              if (this.transaction) {
                this.transaction.emit({deletedRecords: this.selectedRows});
              }
              break;
            }
            default:
              break;
          }
        }
      );
    } else {
      this.deleteRow();
    }*/
  }
}
