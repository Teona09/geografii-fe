import { Component, OnInit } from '@angular/core';
import Data from '../../../../assets/help-page.json';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {
  public jsonItems = Data.Items;
  public  accordionItemsList: { id: number; title: string; content: string; showbody: boolean; }[] = [];
  constructor() {
    for(var _i=0;_i<this.jsonItems.length;_i++){
      this.accordionItemsList.push({id:(_i+1),title:this.jsonItems[_i].title,content:this.jsonItems[_i].content,showbody:false})
    }
  }

  ngOnInit(): void {}


  onClickAccordion(key: any, value: any) {
    if (!value.showbody) {
      value.showbody = true;

      value.accordianclass = 'collapseAccordion';
    } else {
      value.showbody = false;

      value.accordianclass = 'expandAccordion';
    }
  }
}
