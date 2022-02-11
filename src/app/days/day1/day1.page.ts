import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercice } from 'src/app/models/exercice.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-day1',
  templateUrl: './day1.page.html',
  styleUrls: ['./day1.page.scss'],
})
export class Day1Page implements OnInit {

  developers: Exercice[] = [];

  products: Observable<any[]>;

  developer = {};
  product = {};

  constructor(private db: DbService) { }

  ngOnInit() {
    // this.db.getDatabaseState().subscribe(rdy => {
    //   if (rdy) {
    //     this.db.getExercices().subscribe(devs => {
    //       this.developers = devs;
    //       console.log('here1',this.developers)
    //     })
    //   }
    // });
  }

  addDeveloper() {
 
    // this.db.addDeveloper(this.developer['name'], this.developer['set1'], this.developer['set2'], this.developer['set3'], this.developer['set4'], this.developer['img'])
    // .then(_ => {
    //   this.developer = {};
    // });
  }

}
