import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercice } from '../models/exercice.model';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-single-exercice',
  templateUrl: './single-exercice.page.html',
  styleUrls: ['./single-exercice.page.scss'],
})
export class SingleExercicePage implements OnInit {

  exercice!:Exercice;
  exercices:Exercice[]=[];
  


  constructor(private db: DbService, private route: ActivatedRoute) {
    const exerciceId=+this.route.snapshot.params['id'];
    this.exercice =this.db.getExercicebyId(exerciceId)
   }

  ngOnInit() {


  }
  
  updateExercice(){
   this.db.updateExercice(this.exercice)
  }



}
