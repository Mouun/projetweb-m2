import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';
import { ButtonSize } from '../../shared/directives/base-button.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../../shared/services/user.service';
import { UpdateUser } from '../../shared/models/UpdateUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public buttonSize = ButtonSize;
  public profileForm: FormGroup;
  private me: User;

  constructor(
    public router: Router,
    public userService: UserService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.me = data.profileResolverResult[0];
        this.initializeProfileForm();
      });
  }

  private initializeProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      firstname: new FormControl(this.me.firstname, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(this.me.lastname, [Validators.required, Validators.minLength(3)]),
      address: new FormControl(this.me.address),
      postalCode: new FormControl(this.me.postalcode, [Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]),
      city: new FormControl(this.me.city),
    });
  }

  public getFormControl(formControlName: string): AbstractControl {
    return this.profileForm.controls[formControlName];
  }

  public updateProfile(): void {
    this.userService.updateProfile({
      id: this.me.id,
      email: this.me.email,
      firstname: this.profileForm.controls.firstname.value,
      lastname: this.profileForm.controls.lastname.value,
      address: this.profileForm.controls.address.value,
      postalcode: this.profileForm.controls.postalCode.value,
      city: this.profileForm.controls.city.value
    } as UpdateUser).subscribe(updatedUser => {
      this.notificationService.success('Les modifications ont été enregistrées.');
      this.me = updatedUser;
      this.initializeProfileForm();
    });
  }
}
