import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercice } from '../models/exercice.model';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.page.html',
  styleUrls: ['./exercice.page.scss'],
})
export class ExercicePage implements OnInit {

  @Input() exercice!:Exercice;



  constructor(private db: DbService, private router: Router) { }

  ngOnInit() {

  }

  onClickExercice(){
    this.router.navigateByUrl(`exercice-list/${this.exercice.id}`);
  }
}
