import { Directive } from '@angular/core';
import { BaseButtonDirective, ButtonStyle } from './base-button.directive';

@Directive({
  selector: '[appDestructiveActionButton]'
})
export class DestructiveActionButtonDirective extends BaseButtonDirective {

  constructor() {
    super();
    super.setButtonStyle(ButtonStyle.destructive);
    super.setButtonDisable(this.isDisabled);
    super.setButtonRounded(this.rounded);
    super.setButtonSize(this.size);
  }
}
