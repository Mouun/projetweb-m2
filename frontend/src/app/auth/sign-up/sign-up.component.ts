import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonSize } from '../../shared/directives/base-button.directive';
import { MustMatch } from '../../shared/validators/must-match-validator';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public buttonSize = ButtonSize;

  public signUpForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    }, {
      validators: [
        MustMatch('password', 'passwordConfirmation'),
      ]
    });
  }

  public getFormControl(formControlName: string): AbstractControl {
    return this.signUpForm.controls[formControlName];
  }

  public signUp(): void {
    if (this.signUpForm.valid) {
      this.userService.signUp(this.signUpForm.getRawValue())
        .subscribe(() => {
          this.router.navigate(['auth/signin']);
        });
    }
  }

}
