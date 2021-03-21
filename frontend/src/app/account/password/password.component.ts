import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../../shared/validators/must-match-validator';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonSize } from '../../shared/directives/base-button.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { User } from '../../shared/models/User';
import { UpdatePasswordUser } from '../../shared/models/UpdatePasswordUser';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  public buttonSize = ButtonSize;
  public passwordForm: FormGroup;
  private me: User;

  constructor(
    public router: Router,
    public userService: UserService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.me = data.profileResolverResult[0];
        this.initializePasswordForm();
      });
  }

  private initializePasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordConfirm: new FormControl('', [Validators.required])
    }, {
      validators: [
        MustMatch('newPassword', 'newPasswordConfirm')
      ]
    });
  }

  public getFormControl(formControlName: string): AbstractControl {
    return this.passwordForm.controls[formControlName];
  }

  public updatePassword(): void {
    this.userService.changePassword({
      oldPassword: this.passwordForm.controls.oldPassword.value,
      newPassword: this.passwordForm.controls.newPassword.value
    } as UpdatePasswordUser).subscribe(() => {
      this.notificationService.success('Le mot de passe a été changé avec succès.');
      this.initializePasswordForm();
    });
  }

}
