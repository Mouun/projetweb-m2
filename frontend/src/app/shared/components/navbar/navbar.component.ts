import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(.95)' }),
            animate('100ms ease-out',
              style({ opacity: 1, transform: 'scale(1)' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, transform: 'scale(1)' }),
            animate('75ms ease-in',
              style({ opacity: 0, transform: 'scale(.95)' }))
          ]
        )
      ]
    )
  ]
})
export class NavbarComponent implements OnInit {

  public dropdownOpened = false;

  constructor(
    public router: Router,
    public tokenService: TokenService,
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['auth/signin']);
    this.dropdownOpened = false;
  }

  public goToProfile(): void {
    this.router.navigateByUrl('account');
    this.dropdownOpened = false;
  }
}
