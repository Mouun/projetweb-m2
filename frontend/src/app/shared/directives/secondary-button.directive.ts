import { Directive, OnInit } from '@angular/core';
import { BaseButtonDirective, ButtonStyle } from './base-button.directive';

@Directive({
  selector: '[appSecondaryButton]'
})
export class SecondaryButtonDirective extends BaseButtonDirective implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.setButtonStyle(ButtonStyle.secondary);
    super.setButtonDisable(this.isDisabled);
    super.setButtonRounded(this.rounded);
    super.setButtonSize(this.size);
  }

}
