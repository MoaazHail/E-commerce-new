import { Component, inject, OnInit, signal } from '@angular/core';
import { ORDERS_INFO, STATUS_STORE } from '../../../lib/constants/dashboard.constants';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { OrdersInfo, StatusStore } from '../../../lib/types/dashboard';
import { MyOrder } from '../../../lib/types/order';
import { OrderService } from '../../../core/services/order.service';
import { DashboardOrder } from '../../../lib/types/dashboard/order';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  colors: string[];
};
const values: ApexAxisChartSeries = [
  {
    name: 'cat-1',
    data: [44],
  },
  {
    name: 'cat-2',
    data: [17],
  },
  {
    name: 'cat-3',
    data: [21],
  },
  {
    name: 'cat-4',
    data: [15],
  },
  {
    name: 'cat-5',
    data: [10],
  },
];

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // ----- Injectable -----
  private orderService = inject(OrderService);
  // Signals
  public revenueChartOptions: Partial<ChartOptions>;
  public ordersChartOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<ChartOptions>;
  public orders = signal<DashboardOrder[] | null>(null);

  readonly statueStore = signal<StatusStore[]>(STATUS_STORE);

  constructor() {
    this.revenueChartOptions = {
      series: [
        {
          name: 'revenue',
          data: [4000, 3000, 5000, 4800, 6000, 5500],
        },
      ],
      chart: {
        height: 350,
        type: 'line', // Use 'area' if you want a color fill under the line
        toolbar: { show: false },
      },
      colors: ['#3b82f6'], // That nice blue from your screenshot
      stroke: {
        width: 3,
        curve: 'smooth', // This makes the line curved
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val) => `revenue : ${val}`,
        },
      },
    };

    this.ordersChartOptions = {
      series: [
        {
          name: 'orders',
          data: [4000, 3000, 5000, 4800, 6000, 5500],
        },
      ],
      chart: {
        height: 350,
        type: 'bar', // Use 'area' if you want a color fill under the line
        toolbar: { show: false },
      },
      colors: ['#3b82f6'], // That nice blue from your screenshot
      stroke: {
        width: 3,
        curve: 'smooth', // This makes the line curved
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val) => `revenue : ${val}`,
        },
      },
    };

    this.pieChartOptions = {
      series: values, // The percentages or values
      chart: {
        type: 'pie', // Change this to "donut" if you want a hole in the middle
        height: 350,
      },
      colors: ['#3b82f6', '#8b5cf6', '#f43f5e', '#fbbf24', '#10b981'], // Match your colors
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`, // Shows the percentage on the slices
      },
    };
  }
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
}
