import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { UnauthenticatedGuardService } from './shared/services/unauthenticated-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'shop/products', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [UnauthenticatedGuardService],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'shop',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'account',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
