import { Component } from '@angular/core';
import { aggregateBy } from '@progress/kendo-data-query';
import { sampleProducts } from  './products';

@Component({
    selector: 'export',
    template: `
        <kendo-grid [kendoGridBinding]="products" [height]="400" [group]="group">
            <ng-template kendoGridToolbarTemplate>
                <button type="button" kendoGridExcelCommand icon="file-excel">Export to Excel</button>

        <button type="button" kendoGridPDFCommand icon="file-pdf">Export to PDF</button>
            </ng-template>

            <kendo-grid-column field="ProductID" [locked]="true" title="Product ID" [width]="200">
            </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Product Name" [width]="350">
            </kendo-grid-column>
            <kendo-grid-column-group title="Availability" [width]="360">
                <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="120">
                    <ng-template kendoGridGroupFooterTemplate let-aggregates>
                        Sum: {{aggregates["UnitPrice"].sum}}
                    </ng-template>
                    <ng-template kendoGridFooterTemplate let-column="column">
                        Total {{column.title}}: {{total["UnitPrice"].sum}}
                    </ng-template>
                </kendo-grid-column>
                <kendo-grid-column field="UnitsOnOrder" title="Units On Order" [width]="120">
                </kendo-grid-column>
                <kendo-grid-column field="UnitsInStock" title="Units In Stock" [width]="120">
                </kendo-grid-column>
            </kendo-grid-column-group>
            <kendo-grid-column field="Discontinued" width="120">
                <ng-template kendoGridGroupHeaderTemplate  let-value="value">
                   Discontinued: {{value}}
                </ng-template>
                <ng-template kendoGridCellTemplate let-dataItem>
                    <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
                </ng-template>
            </kendo-grid-column>
<kendo-grid-pdf
        fileName="Products.pdf"
        [repeatHeaders]="true"
      ></kendo-grid-pdf>
        <kendo-grid-excel fileName="Products.xlsx"></kendo-grid-excel>
      </kendo-grid>
    `
})
export class ExportComponent {
    public aggregates: any[] = [{field: 'UnitPrice', aggregate: 'sum'}];

    public products: any[] = sampleProducts;

    public total: any = aggregateBy(this.products, this.aggregates);

    public group: any[] = [{
        field: 'Discontinued',
        aggregates: this.aggregates
    }];
}
