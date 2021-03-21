import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CustomInputComponent implements OnInit {

  @Input() public inputType = 'text';
  @Input() public label = '';
  @Input() public controlName: string;
  @Input() public optional = false;
  @Input() public hasError = false;
  @Input() public inputDisabled = false;
  @Input() public placeholder = '';
  @Input() public rounded = false;
  @Output() public whenKeyUp = new EventEmitter<KeyboardEvent>();

  public passwordVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  public emitKeyUp($event: KeyboardEvent): void {
    this.whenKeyUp.emit($event);
  }
}
