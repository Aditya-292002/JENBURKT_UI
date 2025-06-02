import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JENBURKT SALES';
  ngOnInit(): void {
  }


  // @HostListener('window:beforeunload', [ '$event' ])
  // beforeUnloadHandler(event) {
  //   localStorage.clear()
  // }


  // @HostListener("contextmenu", ["$event"])
  //  onRightClick(event) {
  //     event.preventDefault()
  //     localStorage.setItem("IS_TAB","1")
  //  }

 
}
