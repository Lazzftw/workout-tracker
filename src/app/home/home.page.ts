import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/services/db.service';
import { Days } from '../models/days.model';
import { Exercice } from '../models/exercice.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    myExercice!:Exercice[];
    days: Days[] =[];

  constructor(private router: Router, private db: DbService, public alertController: AlertController) {
    
  }

  ngOnInit(): void {  
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDays().subscribe(days => {
          this.days= days;
          console.log('here1',this.days)
        })
      }
    });
  }

  addWorkoutDay(dayName){
    this.db.addDay(dayName)
  }

  deleteWorkoutDay(dayid){
    this.db.deleteDay(dayid)
  }

  editWorkoutDay(newname, dayId){
    this.db.updateDay(newname, dayId)
  }

  async editWorkoutDayAlert(dayid){
    const alert = await this.alertController.create({
      header: 'Edit Workout Name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Workout name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: (data) => {
            this.editWorkoutDay(data.name, dayid)
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteWorkoutDayAlert(dayid){
    const alert = await this.alertController.create({
      header: 'Are you sure to delete this day?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Delete',
          handler: () => {
           this.deleteWorkoutDay(dayid);
          }
        }
      ]
    });

    await alert.present();
  }

  async addWorkoutDayAlert(){
    const alert = await this.alertController.create({
      header: 'Add a new workout day',
      inputs: [
        {
          name: 'day',
          type: 'text',
          placeholder: 'Name your workout day..'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (data) => {
            this.addWorkoutDay(data.day)
          }
        }
      ]
    });
    await alert.present();
    }

  navigateToExercice(dayId: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        day: dayId
      }
    };
    this.router.navigate(['exercice-list'], navigationExtras);
  }
}


