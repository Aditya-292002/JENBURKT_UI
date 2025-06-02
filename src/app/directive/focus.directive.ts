import { Directive, HostListener, Input, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CostFilterPipe } from '../Pipe/filter-pipe.pipe';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9+-]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  } 
}

@Directive({
  selector: '[focusout]'
})
export class FocusDirective {

  constructor(private el: ElementRef) { }
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    value: any = "";
  
    @HostListener('window:keydown.control.m', ['$event']) onInputChange($event) {
      var splitted = this.value.split(" ", 10);
      console.log(splitted)
      // this.value = $event.target.value.toUpperCase(); --due to type both caps and small letter
      this.value = $event.target.value;
      this.ngModelChange.emit(this.value);
    }
    // @HostListener('change', ['$event']) onchange($event) {
    //   var splitted = $event.target.value.split(" ", 7);
    //   console.log(splitted)
    //   let data = "";
    //   this.value = "";
    //   splitted.forEach((element:any)=>{
    //     data = element.substr(0,1).toUpperCase();
    //     this.value = this.value + " " + (data+element.substr(1));
    //   })
    //   this.ngModelChange.emit(this.value);
    // }

}
@Directive({
  selector: '[DecimalNumberOnly]'
})
export class StrictNumberOnlyDirective {
  
  //private regex: RegExp = new RegExp('^[0-9]*$');
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);  //Decimal Number
  private specialKeys: Array<string> = ['Backspace','ArrowLeft','ArrowRight'];
  constructor(private elementRef: ElementRef) { }


  /**
   * Key board action
   * @param event 
   */
  @HostListener('keydown', ['$event'])onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    console.log(event.key);
    if (inputValue && !String(inputValue).match(this.regex)) {
      event.preventDefault();
    }

    return;
  }
}
@Directive({
  selector: '[appTwoDigitDecimaNumber]'
})
export class TwoDigitDecimaNumberDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[appThreeDigitDecimaNumber]'
})
export class ThreeDigitDecimaNumberDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,3}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(this.el.nativeElement.value);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
@Directive({
  selector: '[windowsTabChange]'
})
export class WindowTabDirective {
  
  constructor(private el: ElementRef) {
  }

  @HostListener('window:beforeunload', ['$event'])
  public doSomething(event:Window) {
    console.log("do I see this?",event) // <---- this logs to the console.

    return true;
  }
}

@Directive({ selector: "[costInput]" })
export class CurrencyInputDirective {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CostFilterPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  

  ngOnInit() {
    
    this.el.value = this.currencyPipe.transform(this.el.value);
      
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.el.value = this.currencyPipe.parse(value); // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.currencyPipe.transform(value);
  }

}