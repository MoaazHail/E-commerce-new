import { Component, HostListener, signal } from '@angular/core';
import { ORDERS_INFO } from '../../../lib/constants/dashboard.constants';
import { OrdersInfo } from '../../../lib/types/dashboard';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  public orders = signal<OrdersInfo[]>(ORDERS_INFO);
  activeMenuId = signal<number | null>(null);

  toggleMenu(id: number, event: Event) {
    event.stopPropagation(); // Prevents the row click from firing
    this.activeMenuId.set(this.activeMenuId() === id ? null : id);
  }

  @HostListener('document:click')
  // Close Menu
  closeMenu() {
    this.activeMenuId.set(null);
  }
  exportToExcel() {
    // 1. Prepare the data (filter out fields you don't want in Excel)
    const dataToExport = this.orders().map((order) => ({
      ['Customer Name']: order.username,
      ['Product Name']: order.products[0].title,
      ['Amount']: `$${order.total}`,
      ['Status']: order.isCompleted ? 'Complete' : 'Progress',
    }));

    // 2. Create a worksheet from the JSON data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // 3. Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // 4. Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'Orders_Inventory.xlsx');
  }
}
