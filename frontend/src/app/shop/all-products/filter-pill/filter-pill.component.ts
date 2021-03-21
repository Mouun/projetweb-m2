import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-pill',
  templateUrl: './filter-pill.component.html',
  styleUrls: ['./filter-pill.component.scss']
})
export class FilterPillComponent implements OnInit {

  @Input() filterName: string;
  @Input() disabled: boolean;
  @Input() selected: boolean;
  @Output() whenClicked: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public filterPillClicked(): void {
    this.whenClicked.emit();
  }

}
