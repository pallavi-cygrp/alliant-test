import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toODataString } from '@progress/kendo-data-query';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class OrdersService {
    public orders: Observable<any>;

    private BASE_URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/';
    private tableName = 'Orders';
    private source: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private skip = 0;
    private data: any[] = [];
    private completed = false;

    constructor(private http: HttpClient) {
        this.orders = this.source.asObservable();
    }

    public loadMore(take: number): Observable<any> {
        if (this.completed) {
            return from([true]);
        }

        const skip = this.skip;
        const queryStr = `${toODataString({ skip, take })}`;

        const progress = this.http
            .get(`${this.BASE_URL}${this.tableName}?${queryStr}`)
            .pipe(
                map(response => response['value']),
                tap(values => {
                    if (values.length === 0) {
                        this.completed = true;
                    } else {
                        this.data = [...this.data, ...values];
                        this.source.next(this.data);

                        this.skip += values.length;
                    }
                })
            );

        return progress;
    }
}
