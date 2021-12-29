import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageKey } from 'src/app/core/enums/local-storage-key.enum';
import { InformationModel } from 'src/app/core/models/information.model';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import Data from '../../../../assets/info.json';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
    public closeResult='';
    //public listItems = Data.Items as InformationModel[];
    public  infoList: InformationModel[];
    constructor(private modalService: NgbModal, private localStorage: LocalStorageService) {
  }

    ngOnInit(): void {
      // this.infoList = this.listItems;
      this.infoList = this.localStorage.getItem(
        LocalStorageKey.informations
      ) as InformationModel[];
    }

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl', centered: true});
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
