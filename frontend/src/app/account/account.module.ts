import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { AccountHomeComponent } from './account-home/account-home.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { UserResolver } from '../shared/services/user.service';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AccountHomeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profileResolverResult: UserResolver
        }
      },
      {
        path: 'password',
        component: PasswordComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profileResolverResult: UserResolver
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profileResolverResult: UserResolver
        }
      }
    ]
  }
];

@NgModule({
  declarations: [AccountHomeComponent, ProfileComponent, PasswordComponent, OrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserResolver
  ]
})
export class AccountModule {
}
