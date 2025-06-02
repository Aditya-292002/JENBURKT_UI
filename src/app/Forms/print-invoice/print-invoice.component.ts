import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnInit {
  DataList:any =[];
  @Input() serviceTypeData: any;
  message: string = "Hello!"
  constructor() { }

  ngOnInit(): void {
    
    for(let i=0;i<100;i++){
      this.DataList.push({
        "SR_NO":i,
        "HSN_CODE":3004,
        "Product":"METMIN A TABLET",
        "Quantity":40,
        "Unit": " 2 TAB",
        "Rate":"0.00",
        "Taxable_Value":"0.00",
        "Rate_of_Tax":"",
        "Type_of_Tax":"",
        "Tax_Amt":"0.00"
      });
    }
    if(this.serviceTypeData == 'test'){
      console.log("success")
      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.printDiv('print-new')
    }, 2000);
    }
   
    
    
  }



   printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

}
