import { NgModule } from "@angular/core";
import { MatInputModule} from "@angular/material/input";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatSortModule} from "@angular/material/sort";
import { MatTableModule} from "@angular/material/table";

@NgModule({
  exports: [
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
         MatSortModule, MatTableModule
  ]
  
})
export class MaterialDatatableModule { }