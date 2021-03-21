import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ButtonSize } from '../../shared/directives/base-button.directive';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeContext, Options, PointerType } from '@angular-slider/ngx-slider';
import { ProductFilter } from './models/ProductFilter';
import { Product } from '../../shared/models/Product';
import { debounceTime } from 'rxjs/operators';
import { FilterCollapsibleComponent } from './filter-collapsible/filter-collapsible.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductService } from '../../shared/services/product.service';

class AppliedFilter {
  name: string;
  collapsibleName: string;
  templateName: string;
  activated: boolean;
  isCollapsible: boolean;
  sliderOptions?: Options;
  sliderChangeHandle?: (event: ChangeContext) => {};
}

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  animations: [
    trigger('openFiltersModalAnimation', [
      state('closed', style({ transform: 'translateX(24rem)' })),
      state('opened', style({ transform: 'translateX(-24rem)' })),
      transition('opened => closed', animate('400ms ease-in-out')),
      transition('closed => opened', animate('400ms ease-in-out')),
    ])
  ]
})
export class AllProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  @ViewChildren(FilterCollapsibleComponent) collapsibles: QueryList<FilterCollapsibleComponent>;

  public buttonSize = ButtonSize;

  private readonly debounceTime = 300;
  private searchFieldTextChanged: Subject<string> = new Subject();
  public productFilter: ProductFilter = {
    keyword: '',
    lowerPriceLimit: 0,
    upperPriceLimit: 0,
    lowerHorsepowerLimit: 0,
    upperHorsepowerLimit: 0
  };

  public filteredProducts: Product[] = [];

  public showFiltersModal = false;
  public filtersModalState = 'closed';

  public minimumPrice = 0;
  public maximumPrice = 0;
  public minimumHorsepower = 0;
  public maximumHorsepower = 0;

  private defaultPriceRange = [] as number[];
  private defaultHorsepowerRange = [] as number[];
  public appliedFilters = [] as AppliedFilter[];
  public filtersForm: FormGroup;

  public priceSliderOptions: Options;
  public horsepowerSliderOptions: Options;

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.initProducts(data.productsResolverResult[0].data as Product[]);
        this.minimumPrice = data.productsResolverResult[0].minimumPrice / 100;
        this.maximumPrice = data.productsResolverResult[0].maximumPrice / 100;
        this.minimumHorsepower = data.productsResolverResult[0].minimumHorsepower;
        this.maximumHorsepower = data.productsResolverResult[0].maximumHorsepower;
        this.productFilter.lowerPriceLimit = this.minimumPrice * 100;
        this.productFilter.upperPriceLimit = this.maximumPrice * 100;
        this.productFilter.lowerHorsepowerLimit = this.minimumHorsepower;
        this.productFilter.upperHorsepowerLimit = this.maximumHorsepower;
      });
    this.initializeFiltersForms();

    this.searchFieldTextChanged
      .pipe(debounceTime(this.debounceTime))
      .subscribe(searchFieldValue => {
        this.productFilter.keyword = searchFieldValue;
        this.getProducts();
      });

    this.priceSliderOptions = {
      floor: this.minimumPrice,
      ceil: this.maximumPrice,
      step: 1,
      animate: false
    } as Options;

    this.horsepowerSliderOptions = {
      floor: this.minimumHorsepower,
      ceil: this.maximumHorsepower,
      step: 1,
      animate: false
    } as Options;

    this.initializeAppliedFilters();
  }

  public openFiltersModal(clickedAppliedFilter: AppliedFilter): void {
    this.showFiltersModal = true;
    this.filtersModalState = 'opened';
    document.body.style.overflow = 'hidden';
    if (clickedAppliedFilter.isCollapsible) {
      this.collapsibles.find(x => x.filterName === clickedAppliedFilter.collapsibleName).toggleCollapsible();
    }
  }

  public closeFiltersModal(): void {
    this.showFiltersModal = false;
    this.filtersModalState = 'closed';
    document.body.style.removeProperty('overflow');
    this.collapsibles.forEach(collapsible => {
      if (collapsible.opened) { collapsible.toggleCollapsible(); }
    });
  }

  private initializeAppliedFilters(): void {
    this.appliedFilters.push({
      name: 'Recherche',
      collapsibleName: 'Recherche',
      templateName: 'search',
      activated: false,
      isCollapsible: false
    } as AppliedFilter);
    this.appliedFilters.push({
      name: 'Prix',
      collapsibleName: 'Prix',
      templateName: 'price',
      activated: false,
      isCollapsible: true,
      sliderOptions: this.priceSliderOptions,
      sliderChangeHandle: this.onPriceRangeChanged.bind(this)
    } as AppliedFilter);
    this.appliedFilters.push({
      name: 'Puissance',
      collapsibleName: 'Puissance',
      templateName: 'horsepower',
      activated: false,
      isCollapsible: true,
      sliderOptions: this.horsepowerSliderOptions,
      sliderChangeHandle: this.onHorsepowerRangeChanged.bind(this)
    } as AppliedFilter);
  }

  private initializeFiltersForms(): void {
    this.filtersForm = this.formBuilder.group({
      keyword: new FormControl(''),
      price: new FormControl([this.minimumPrice, this.maximumPrice]),
      horsepower: new FormControl([this.minimumHorsepower, this.maximumHorsepower])
    });

    this.defaultPriceRange = [this.minimumPrice, this.maximumPrice];
    this.defaultHorsepowerRange = [this.minimumHorsepower, this.maximumHorsepower];
  }

  public onSearchFieldValueChanged(event: any): void {
    if (event.target.value !== '') {
      this.appliedFilters[0].activated = true;
      this.appliedFilters[0].name = `"${event.target.value.trim()}"`;
    } else {
      this.appliedFilters[0].activated = false;
      this.appliedFilters[0].name = 'Recherche';
    }

    this.searchFieldTextChanged.next(event.target.value.trim().toLowerCase());
  }

  public onPriceRangeChanged(event: ChangeContext): void {
    if (event.pointerType === PointerType.Min) {
      this.productFilter.lowerPriceLimit = event.value * 100;
    } else {
      this.productFilter.upperPriceLimit = event.highValue * 100;
    }

    const priceRange = this.filtersForm.getRawValue().price;
    if (!(JSON.stringify(this.defaultPriceRange) === JSON.stringify(priceRange))) {
      this.appliedFilters[1].activated = true;
      this.appliedFilters[1].name = `${priceRange[0]}€ - ${priceRange[1]}€`;
    } else {
      this.appliedFilters[1].activated = false;
      this.appliedFilters[1].name = 'Prix';
    }

    this.getProducts();
  }

  public onHorsepowerRangeChanged(event: ChangeContext): void {
    if (event.pointerType === PointerType.Min) {
      this.productFilter.lowerHorsepowerLimit = event.value;
    } else {
      this.productFilter.upperHorsepowerLimit = event.highValue;
    }

    const horserpowerRange = this.filtersForm.getRawValue().horsepower;
    if (!(JSON.stringify(this.defaultHorsepowerRange) === JSON.stringify(horserpowerRange))) {
      this.appliedFilters[2].activated = true;
      this.appliedFilters[2].name = `${horserpowerRange[0]}cv - ${horserpowerRange[1]}cv`;
    } else {
      this.appliedFilters[2].activated = false;
      this.appliedFilters[2].name = 'Puissance';
    }

    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getWithFilter(this.productFilter)
      .subscribe((response) => {
        this.minimumPrice = response.minimumPrice / 100;
        this.maximumPrice = response.maximumPrice / 100;
        this.minimumPrice = response.minimumHorsepower;
        this.maximumPrice = response.maximumHorsepower;
        this.priceSliderOptions.floor = this.minimumPrice;
        this.priceSliderOptions.ceil = this.maximumPrice;
        this.horsepowerSliderOptions.floor = this.minimumHorsepower;
        this.horsepowerSliderOptions.ceil = this.maximumHorsepower;

        this.defaultPriceRange = [this.minimumPrice, this.maximumPrice];
        this.defaultHorsepowerRange = [this.minimumHorsepower, this.maximumHorsepower];

        this.initProducts(response.data);
      });
  }

  private initProducts(fetchedProducts: any[]): void {
    this.filteredProducts = [] as Product[];
    fetchedProducts.forEach(product => {
      this.filteredProducts.push(product);
    });
  }

}
