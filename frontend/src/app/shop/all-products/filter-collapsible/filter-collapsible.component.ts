import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-collapsible',
  templateUrl: './filter-collapsible.component.html',
  styleUrls: ['./filter-collapsible.component.scss']
})
export class FilterCollapsibleComponent implements OnInit, AfterViewInit {

  @Input() filterName: string;
  @ViewChild('content') collapsibleContent: ElementRef;

  public opened = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleCollapsible(): void {
    if (this.collapsibleContent.nativeElement.style.maxHeight) {
      this.collapsibleContent.nativeElement.style.maxHeight = null;
      this.opened = false;
    } else {
      this.collapsibleContent.nativeElement.style.maxHeight = this.collapsibleContent.nativeElement.scrollHeight + 'px';
      this.opened = true;
    }
  }

  ngAfterViewInit(): void {
  }

}
