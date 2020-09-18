import { Component, OnInit, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const APP_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkHourSelectComponent),
  multi: true
};

@Component({
  selector: 'app-work-hour-select',
  templateUrl: './work-hour-select.component.html',
  providers: [APP_SELECT_VALUE_ACCESSOR]
})
export class WorkHourSelectComponent implements OnInit, ControlValueAccessor {
  data: any;
  onChange: (value: any) => void;
  filterCtrl: FormControl = new FormControl();
  filteredOptions: any[];

  @Input() placeholder: string;

  @Input() showAllOption: boolean = false;

  @Input() required: boolean = false;

  @Input() disabled: boolean = false;

  @Input() cName: any;

  @Input() multiSelect: boolean = false;

  @Input() addAllOption: boolean = false;

  @Input() allOptionText: string = 'ALL';

  @Input() emptyItem: boolean = true;

  @Input() emptyItemText: string = "PLEASE-SELECT";

  @Input() options: any[];

  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit() {
    
  }

  onChangeSelection($event: any) {
    this.onSelectionChange.emit($event);
    this.onChange(this.data);
  }

  openedChange($event: any) {
    if ($event == false) {
      if (this.data == undefined) {
        this.onChange(undefined);
      }
    }
  }

  writeValue(obj: any): void {
    this.data = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // todo;
  }
  setDisabledState?(isDisabled: boolean): void {
    // todo;
  }

}
