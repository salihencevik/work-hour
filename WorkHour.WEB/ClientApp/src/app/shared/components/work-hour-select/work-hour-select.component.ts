import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Injector,
  forwardRef
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';


import * as _ from 'lodash'; 

export const APP_SELECT_SEARCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkHourSelectComponent),
  multi: true
};

@Component({
  selector: 'work-hour-select',
  templateUrl: './work-hour-select.component.html',
  providers: [APP_SELECT_SEARCH_VALUE_ACCESSOR]
})
export class WorkHourSelectComponent
  implements OnInit, ControlValueAccessor {
  data: any;
  onChange: (value: any) => void;
  filterCtrl: FormControl = new FormControl();
  filteredOptions: any[];

  @Input()
  placeholder: string;

  @Input()
  showAllOption: boolean = false;

  @Input()
  required: boolean = false;

  @Input()
  disabled: boolean = false;


  @Input()
  cName: any;

  @Input()
  multiSelect: boolean = false;


  @Input()
  addAllOption: boolean = false;


  @Input()
  allOptionText: string = 'ALL';

  @Input()
  emptyItem: boolean = true;

  @Input()
  emptyItemText: string = "Lütfen Seçiniz.";



  @Input()
  options: any[];


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

  // Begin - ControlValueAccessor implementation
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
  // End - ControlValueAccessor implementation

  // todo : delete these
  // @Input() ngModelData: any;
  // @Output() ngModelDataChange: EventEmitter<any> = new EventEmitter<any>();
}


