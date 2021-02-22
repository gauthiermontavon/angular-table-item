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
    console.log("SERVICE CALL STEP 1:" + filter);
    if (filter) {
      console.log("---------------------");
      // we were given filtering criteria, build the query string
      Object.keys(filter)
        .sort()
        .forEach(key => {
          console.log("***");
          const value = filter[key];
          console.log(key + ":" + value);
          console.log("JSON:" + JSON.stringify(value));
          console.log("typepof value" + typeof value);

          if (typeof value == "string") {
            parameters = parameters.set(key, value.toString());
          } else if (typeof value == "object" && value !== null) {
            console.log("OH IT A COMPLETE OBJECT, need to explore it");
            Object.keys(value)
              .sort()
              .forEach(key2 => {
                const value2 = value[key2];
                console.log("******");
                console.log(key2 + ":" + value2);
                console.log("JSON:" + JSON.stringify(value));
                console.log("typepof value" + typeof value2);
                if (typeof value2 == "string") {
                  parameters = parameters.set(key2, value2.toString());
                } else if (typeof value2 == "object" && value2 !== null) {
                  console.log("to deep for me...max 2 levels");
                  console.log("please implement recursive buildParams method");
                }
              });
          }
        });
      console.log("---------------------");
    }

    parameters = parameters
      .set("sortOrder", sortOrder)
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());
    console.log("SERVICE call with parameters:" + console.log(parameters));
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
  //TODO: recursive fonction to collect form into form into form....
  private buildParams(filter: Object): HttpParams {
    /*console.log("---------------------");
      // we were given filtering criteria, build the query string
      Object.keys(filter)
        .sort()
        .forEach(key => {
          const value = filter[key];
          console.log(key + ":" + value);
          console.log("typepof value" + typeof value);

          if (typeof value == "string") {
           
             parameters = parameters.set(key, value.toString());
          }
          else if (value !== null) {
            console.log("OH IT A COMPLETE OBJECT, need to explore it");
          }
        });
      console.log("---------------------");
*/

    return new HttpParams();
  }
}
