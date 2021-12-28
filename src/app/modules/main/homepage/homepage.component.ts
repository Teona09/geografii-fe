import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LocalStorageKey } from 'src/app/core/enums/local-storage-key.enum';
import { LevelModel } from 'src/app/core/models/level.model';
import { LevelService } from 'src/app/core/services/level.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  selectedPrincipat = '';
  id = 1;

  constructor(
    private router: Router,
    private levelService: LevelService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    window.document.body.style.backgroundColor = '#000000';
  }

  selectPrincipat(principat: string) {
    this.selectedPrincipat = principat.toUpperCase();
    this.levelService
      .getLevelByRegion(/* this.selectedPrincipat */'transilvania')
      .pipe(take(1))
      .subscribe((result: LevelModel) => {
        console.log(result);
        this.localStorage.setItem(result.questionModels, LocalStorageKey.questions);
      });
  }

  changeRoute(url: string) {
    this.router.navigate(['main/' + url]);
  }

  ngOnDestroy() {
    window.document.body.style.backgroundColor = '#ffffff';
  }
}
