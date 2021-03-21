import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
  HeroIconsModule,
  userCircle,
  eye,
  eyeOff,
  gift,
  truck,
  clock,
  x,
  chevronUp,
  chevronDown,
  lightningBolt, cog, fire, userSolid, logout, arrowLeft, user, key, collection
} from 'ng-heroicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomInputErrorComponent } from './components/custom-input/custom-input-error/custom-input-error.component';
import { BaseButtonDirective } from './directives/base-button.directive';
import { DestructiveActionButtonDirective } from './directives/destructive-action-button.directive';
import { SecondaryButtonDirective } from './directives/secondary-button.directive';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpListenerService } from './services/http-listener.service';
import { environment } from '../../environments/environment';
import { ClickOutsideModule } from 'ng-click-outside';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [
    NotFoundComponent,
    NavbarComponent,
    CustomInputComponent,
    CustomInputErrorComponent,
    BaseButtonDirective,
    DestructiveActionButtonDirective,
    SecondaryButtonDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ClickOutsideModule,
    NgxSliderModule,
    HeroIconsModule.withIcons({
      userCircle,
      eye,
      eyeOff,
      gift,
      truck,
      clock,
      x,
      chevronUp,
      chevronDown,
      lightningBolt,
      cog,
      fire,
      userSolid,
      logout,
      arrowLeft,
      user,
      key,
      collection
    }),
    SwiperModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    CustomInputComponent,
    CustomInputErrorComponent,
    ReactiveFormsModule,
    ClickOutsideModule,
    FormsModule,
    HttpClientModule,
    NgxSliderModule,
    HeroIconsModule,
    BaseButtonDirective,
    DestructiveActionButtonDirective,
    SecondaryButtonDirective,
    SwiperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpListenerService, multi: true },
    { provide: 'API_URL', useValue: environment.apiUrl },
  ]
})
export class SharedModule {
}
