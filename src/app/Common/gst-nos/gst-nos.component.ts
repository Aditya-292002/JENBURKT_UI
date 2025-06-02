import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gst-nos',
  templateUrl: './gst-nos.component.html',
  styleUrls: ['./gst-nos.component.css']
})
export class GstNosComponent implements OnInit {
  STATE_CODE=[];
  GST_CLASS=[];
  constructor() { }

  ngOnInit(): void {
  }

}
