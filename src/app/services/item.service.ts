import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Item } from "../interfaces/item";
import { MetaResult } from "../interfaces/meta-result";
import { ServiceResultItems } from "../interfaces/service-result-items";

import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable()
export class ItemService {
  // private itemsListSubject: Subject<Item[]> = new Subject<Item[]>();
  private server_url: String =
    "https://httpserver-jsonstorage.gmontavon.repl.co";

  constructor(private http: HttpClient) {
    console.log("Item service construction");
    // this.retrieveListItemsFromDb();
    console.log("Item service construction 2");
  }

  findItems(
    filter = null,
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<ServiceResultItems> {
    let parameters = new HttpParams();
    if (filter) {
      // we were given filtering criteria, build the query string
      Object.keys(filter)
        .sort()
        .forEach(key => {
          const value = filter[key];
          if (value !== null) {
            parameters = parameters.set(key, value.toString());
          }
        });
    }

    parameters = parameters
      .set("sortOrder", sortOrder)
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get<ServiceResultItems>(this.server_url + "/item/list", {
      params: parameters
    });
  }

  addItem(item: Item) {
    //this.http.post("http://localhost:3000/items", item).subscribe();
  }

  getListItems() {
    //return this.itemsListSubject.asObservable();
    /*
    this.http
      .get<Item[]>("http://localhost:3000/item/list")
      .subscribe(response => console.log(response));
      */
  }
  /*
  retrieveListItemsFromDb() {
    this.http
      .get<Item[]>(this.server_url + "/item/list")
      .subscribe(response => this.itemsListSubject.next(response));
  }*/

  getTagsUsed(): Observable<any> {
    return this.http.get<String[]>(this.server_url + "/tags/used", {});
  }
}
