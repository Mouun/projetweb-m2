import { Component, OnInit } from '@angular/core';
import { HeroIconName } from 'ng-heroicons';
import { Router } from '@angular/router';

export interface AccountHomeSection {
  icon: HeroIconName;
  sectionTitle: string;
  sectionDescription: string;
  buttonLabel: string;
  destination: string;
}

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {

  public accountHomeSections = [
    {
      icon: 'user',
      sectionTitle: 'Données personnelles',
      sectionDescription: 'Modifier mes données personnelles',
      buttonLabel: 'Modifier',
      destination: '/profile'
    } as AccountHomeSection,
    {
      icon: 'key',
      sectionTitle: 'Mot de passe',
      sectionDescription: 'Modifier mon mot de passe',
      buttonLabel: 'Modifier',
      destination: '/password'
    } as AccountHomeSection,
    {
      icon: 'collection',
      sectionTitle: 'Commandes',
      sectionDescription: 'Visualiser mes commandes',
      buttonLabel: 'Voir',
      destination: '/orders'
    } as AccountHomeSection
  ] as AccountHomeSection[];

  constructor(
    public router: Router
  ) {
  }

  ngOnInit(): void {
  }
}
