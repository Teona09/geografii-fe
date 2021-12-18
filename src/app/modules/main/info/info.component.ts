import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Data from '../../../../assets/info.json';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
    public closeResult='';
    public jsonItems = Data.Items;
    public  infoList: { id: number; title: string; content: string; showbody: boolean; }[] = [];
    constructor(private modalService: NgbModal) {
    for(var _i=0;_i<this.jsonItems.length;_i++){
      this.infoList.push({id:(_i+1),title:this.jsonItems[_i].title,content:this.jsonItems[_i].content,showbody:false})
    }
  }

    ngOnInit(): void {}

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }
  }
