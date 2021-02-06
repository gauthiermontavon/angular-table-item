import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing/app-routing.module";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { ItemSearchComponent } from "./item-search/item-search.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ItemService } from "./services/item.service";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
/*import { MaterialDatatableModule } from "./material/material-datatable/material-datatable.module";*/
import { MaterialFullModule } from "./material/material-full.module";
import { ItemDialogComponent } from "./item-search//item-dialog/item-dialog.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialFullModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ItemSearchComponent,
    ItemDetailComponent,
    DashboardComponent,
    ItemDialogComponent
  ],
  entryComponents: [ ItemDialogComponent],
  bootstrap: [AppComponent],
  providers: [ItemService]
})
export class AppModule {}
