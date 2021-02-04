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

@Component({
  selector: "app-item-search",
  templateUrl: "./item-search.component.html",
  styleUrls: ["./item-search.component.css"]
})
export class ItemSearchComponent implements AfterViewInit, OnInit {
  item: Item;
  displayedColumns: string[] = ["id", "title", "path", "author"];
  defaultPageSize: number = 5;

  dataSource: ItemDatasource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("input") input: ElementRef;
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.dataSource = new ItemDatasource(this.itemService);
    this.dataSource.loadItems("", "asc", 0, this.defaultPageSize);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadItemsPage();
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.loadItemsPage())).subscribe();
  }

  loadItemsPage() {
    this.dataSource.loadItems(
      this.input.nativeElement.value,
      "asc",
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
