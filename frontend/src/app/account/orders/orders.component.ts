import { Component, OnInit } from '@angular/core';
import { ButtonSize } from '../../shared/directives/base-button.directive';
import { Order } from '../../shared/models/Order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public buttonSize = ButtonSize;

  public orders = [] as Order[];

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.orders = data.profileResolverResult[0].orders;
      });
  }

}
