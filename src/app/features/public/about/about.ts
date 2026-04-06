import { Component, signal } from '@angular/core';
import { CAROUSEL_INFO } from '../../../lib/constants/about.constants';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  carouselInfo = signal(CAROUSEL_INFO);
}
