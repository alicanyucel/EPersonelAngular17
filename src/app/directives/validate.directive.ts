import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[validate]',
  standalone: true
})
export class ValidateDirective {

  constructor(private el: ElementRef) { }

  @HostListener("keyup") onkeyup(){
    const isValid:boolean = this.el.nativeElement.validity.valid;
    if(isValid){
      this.el.nativeElement.className = "form-control"
    }else{
      this.el.nativeElement.className = "form-control is-invalid"
      const id:string = `#${this.el.nativeElement.id}`
      
      const message:string = this.el.nativeElement.validationMessage;
      const divEl = document.querySelector(`${id} + div`);
      if(divEl){
        divEl.innerHTML = message;
      }
    }  
  }
}
