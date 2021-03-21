import { Directive, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

export enum ButtonStyle {
  'base',
  'secondary',
  'destructive'
}

export enum ButtonSize {
  'xs',
  'sm',
  'base',
  'lg',
  'xl'
}

@Directive({
  selector: '[appBaseButton]'
})
export class BaseButtonDirective implements OnInit, OnChanges {

  @HostBinding('class')
  classes = 'inline-flex items-center opacity-100 cursor-pointer justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

  @HostBinding('disabled')
  disabled = false;

  @Input() public isDisabled = false;
  @Input() public rounded = false;
  @Input() public size = ButtonSize.base;

  constructor() {
  }

  ngOnInit(): void {
    this.setButtonStyle(ButtonStyle.base);
    this.setButtonDisable(this.isDisabled);
    this.setButtonRounded(this.rounded);
    this.setButtonSize(this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      this.setButtonDisable(changes.isDisabled.currentValue);
    }
  }

  public setButtonStyle(style: ButtonStyle): void {
    switch (style) {
      case ButtonStyle.base:
        this.classes +=
          ' text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm border-transparent';
        break;
      case ButtonStyle.secondary:
        this.classes += ' text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500 border-transparent';
        break;
      case ButtonStyle.destructive:
        this.classes += ' text-white bg-red-500 hover:bg-red-600 focus:ring-red-400 shadow-sm border-transparent';
        break;
    }
  }

  public setButtonDisable(disabled: boolean): void {
    if (disabled) {
      this.classes = this.classes.replace('opacity-100 cursor-pointer', 'opacity-50 cursor-not-allowed');
      this.disabled = true;
    } else {
      this.classes = this.classes.replace('opacity-50 cursor-not-allowed', 'opacity-100 cursor-pointer');
      this.disabled = false;
    }
  }

  public setButtonRounded(rounded: boolean): void {
    if (rounded) {
      this.classes += ' rounded-full';
    }
  }

  public setButtonSize(size: ButtonSize): void {
    switch (size) {
      case ButtonSize.xs:
        this.classes += ' px-2.5 py-1.5 text-xs';
        break;
      case ButtonSize.sm:
        this.classes += ' px-3 py-2 text-sm leading-4';
        break;
      case ButtonSize.base:
        this.classes += ' px-4 py-2 text-sm';
        break;
      case ButtonSize.lg:
        this.classes += ' px-4 py-2 text-base';
        break;
      case ButtonSize.xl:
        this.classes += ' px-6 py-3 text-base';
        break;
    }
  }
}
