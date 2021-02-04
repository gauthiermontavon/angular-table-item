import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Item } from "../interfaces/item";
import { MetaResult } from "../interfaces/meta-result";
import { ServiceResultItems } from "../interfaces/service-result-items";
import { ItemService } from "./item.service";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class ItemDatasource implements DataSource<Item> {
  private totalCount: number;
  itemsSubject = new BehaviorSubject<Item[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private itemService: ItemService) {}

  connect(collectionViewer: CollectionViewer): Observable<Item[]> {
    return this.itemsSubject;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.itemsSubject.complete();
    this.loadingSubject.complete();
  }

  loadItems(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);
    this.itemService
      .findItems(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )

      .subscribe((items:ServiceResultItems)  => {
        console.log("COUCOU Jai bien recu les résultats");
        console.log("total:" + items.meta.totalCount);
        this.totalCount = items.meta.totalCount;
        this.itemsSubject.next(items.payload);
      });
  }
}
