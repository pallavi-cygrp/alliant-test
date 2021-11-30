import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { Observable } from 'rxjs';

import { OrdersService } from './northwind.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  providers: [OrdersService],
    selector: 'endless-scrolling',
    templateUrl: './endless-scrolling.html'
    
})
export class EndlessScrollingComponent {
  public data: Observable<any>;
  public loading: boolean;

  private pageSize = 200;

  constructor(private service: OrdersService) {
    this.data = service.orders;
    this.loadMore();
  }

  public loadMore(): void {
    this.loading = true;
    this.service.loadMore(this.pageSize).subscribe(() =>
      this.loading = false
    );
  }
}
