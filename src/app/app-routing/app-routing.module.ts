import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { ItemDetailComponent } from "../item-detail/item-detail.component";
import { ItemSearchComponent } from "../item-search/item-search.component";
import {HelpComponent} from "../help/help.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "detail/:id", component: ItemDetailComponent },
  { path: "items", component: ItemSearchComponent },
  { path: "help", component: HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
