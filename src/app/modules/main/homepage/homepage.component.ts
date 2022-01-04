import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LocalStorageKey } from 'src/app/core/enums/local-storage-key.enum';
import { LevelModel } from 'src/app/core/models/level.model';
import { LevelService } from 'src/app/core/services/level.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  selectedPrincipat = '';
  id = 1;
  principat: LevelModel = {
    id: 1,
    maximumPoints: 0,
    region: '',
    questionModels: [],
    informationModels: [],
  } as LevelModel;

  constructor(
    private router: Router,
    private levelService: LevelService,
    private localStorage: LocalStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    window.document.body.style.backgroundColor = '#000000';
    this.localStorage.setItem(
      {},
      LocalStorageKey.questions
    );

    this.localStorage.setItem(
      {},
      LocalStorageKey.informations
    );
  }

  selectPrincipat(principat: string) {
    this.selectedPrincipat = principat.toUpperCase();
    this.levelService
      .getLevelByRegion(this.selectedPrincipat /* 'transilvania' */)
      .pipe(take(1))
      .subscribe((result: LevelModel) => {
        if (result) {
          this.principat = result as LevelModel;
          this.localStorage.setItem(
            result.questionModels,
            LocalStorageKey.questions
          );
          this.localStorage.setItem(
            result.informationModels,
            LocalStorageKey.informations
          );
        } else {
          this.notificationService.showError('Eroare la conectarea cu baza de date', '');
        }
      });
  }

  changeRoute(url: string) {
    this.router.navigate(['main/' + url]);
  }

  ngOnDestroy() {
    window.document.body.style.backgroundColor = '#ffffff';
  }
}
