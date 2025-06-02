import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rolemaster',
  templateUrl: './rolemaster.component.html',
  styleUrls: ['./rolemaster.component.css']
})
export class RolemasterComponent implements OnInit {

  moduleList = [{ "ModuleCode": "1", "ModuleName": "Finance", "Description": "" }, { "ModuleCode": "2", "ModuleName": "Purchase", "Description": "" }, { "ModuleCode": "3", "ModuleName": "Sales", "Description": "" }, { "ModuleCode": "4", "ModuleName": "Metal", "Description": "" },];
  functionList = [{ "ModuleCode": "1", "functionCode": "1", "functionName": "Jounral Vouchar", "Description": "", "Create": "", "Edit": "", "Delete": "" },
  { "ModuleCode": "1", "functionCode": "2", "functionName": "Bank Receipt", "Description": "", "Create": "", "Edit": "", "Delete": "" },
  { "ModuleCode": "1", "functionCode": "3", "functionName": "Bank Payment", "Description": "", "Create": "", "Edit": "", "Delete": "" },
  { "ModuleCode": "2", "functionCode": "4", "functionName": "Import Material", "Description": "", "Create": "", "Edit": "", "Delete": "" },
  { "ModuleCode": "3", "functionCode": "5", "functionName": "Export Material", "Description": "", "Create": "", "Edit": "", "Delete": "" }]

  newFunctionList: any = [];

  constructor() { }

  ngOnInit(): void {
  }
  showModuleListData(code: any, name: any) {
    this.newFunctionList = [];
    var j = 0
    for (let i = 0; i < this.functionList.length; i++) {
      if (this.functionList[i].ModuleCode == code) {
        this.newFunctionList[j] = this.functionList[i]
        j++
      }
    }
  }

}
