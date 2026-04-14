import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { MyOrder, ShippingAddress } from '../../../lib/types/order';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  // ----- Injectable -----
  private _orderService = inject(OrderService);

  // Signals
  orders = signal<MyOrder[] | null>(null);
  isShippingAddress = signal<boolean>(false);
  shippingAddress = signal<ShippingAddress | undefined>(undefined);

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._orderService.getMyOrders().subscribe({
      next: (payload) => {
        console.log(payload.data.orders);
        this.orders.set(payload.data.orders);
      },
    });
  }

  onShippingAddress(address: ShippingAddress | undefined) {
    this.isShippingAddress.set(false);

    setTimeout(() => {
      this.shippingAddress.set(address);
      this.isShippingAddress.set(true);
    }, 0);
  }

  // Add a listener to close the modal
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {}
}
