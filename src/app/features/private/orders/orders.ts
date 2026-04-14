import { Component, effect, HostListener, inject, OnInit, signal } from '@angular/core';
import * as XLSX from 'xlsx';
import { Item, MyOrder } from '../../../lib/types/order';
import { OrderService } from '../../../core/services/order.service';
import { DashboardOrder } from '../../../lib/types/dashboard/order';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);
  public orders = signal<DashboardOrder[] | null>(null);
  public orderItem = signal<Item[] | null>(null);
  activeMenuId = signal<string | null>(null);
  onUpdate = signal<boolean>(false);
  onDelete = signal<boolean>(false);
  id = signal<string>('');

  private refreshTrigger = signal<number>(0);

  constructor() {
    effect(() => {
      const trigger = this.refreshTrigger();
      console.log('Refresh triggered! Execution count:', trigger);
      this.getAllOrder();
    });
  }
  triggerRefresh() {
    this.refreshTrigger.update((v) => v + 1);
    this.onUpdate.set(false);
    this.onDelete.set(false);
  }
  // Ng OnInit
  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder() {
    this.orderService.getAllOrder().subscribe({
      next: (payload) => {
        console.log(payload.data.orders);
        this.orders.set(payload.data.orders);
        console.log(this.orders());
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  toggleMenu(id: string, event: Event) {
    this.id.set(id);
    event.stopPropagation(); // Prevents the row click from firing
    this.activeMenuId.set(this.activeMenuId() === id ? null : id);
    this.onUpdate.set(false);
    this.onDelete.set(false);
    // console.log(this.id());
  }

  @HostListener('document:click')
  // Close Menu
  closeMenu() {
    this.activeMenuId.set(null);
  }

  exportToExcel() {
    // 1. Prepare the data (filter out fields you don't want in Excel)
    const dataToExport = this.orders()?.map((item) => ({
      ['Customer Name']: item.user.email,
      ['Product Name']: item.cartItems.map((product) => product.product.name).join(', '),
      ['Amount']: `$${item.totalOrderPrice.toString()}`,
      ['Date']: new Date(item.createdAt).toLocaleDateString('en-GB'),
    }));
    if (!dataToExport) return;

    // 2. Create a worksheet from the JSON data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // 3. Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // 4. Generate the file
    XLSX.writeFile(workbook, 'Orders_Inventory.xlsx');
  }
}
