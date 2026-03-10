import { Component, Input } from '@angular/core';
import { InputConfig } from './types';
import { FieldTree, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputField {
  @Input({ required: true }) inputConfig!: InputConfig;
  // @Input({}) formField!: ;

  showPassword: boolean = false;
}
