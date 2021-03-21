import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonSize } from '../../shared/directives/base-button.directive';
import { AuthService } from '../../shared/services/auth.service';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public buttonSize = ButtonSize;
  public signInForm: FormGroup;

  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = '/';
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.returnUrl !== undefined) {
        this.returnUrl = params.returnUrl;
      }
    });
  }

  public getFormControl(formControlName: string): AbstractControl {
    return this.signInForm.controls[formControlName];
  }

  public signIn(): void {
    if (this.signInForm.valid) {
      const credentials = this.signInForm.getRawValue();
      this.authService.signIn(credentials.email, credentials.password)
        .subscribe((token: string) => {
          this.tokenService.setToken(token);
          this.router.navigateByUrl(this.returnUrl);
        });
    }
  }
}
