import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercice } from '../models/exercice.model';
import { DbService } from '../services/db.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';

@Component({
  selector: 'app-exercice-list',
  templateUrl: './exercice-list.page.html',
  styleUrls: ['./exercice-list.page.scss'],
})

export class ExerciceListPage implements OnInit {

  myExercice: Exercice[] = [];
  dayId: number;
  options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    allowEdit: true
  }

  constructor(private db: DbService, 
              private route: ActivatedRoute, 
              private router: Router, 
              public alertController: AlertController,
              public actionSheetController: ActionSheetController,
              private camera: Camera,
              private webview: WebView) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dayId = this.router.getCurrentNavigation().extras.state.day;
        console.log(this.dayId)
      }
    });
   }

  ngOnInit() {
    
   this.db.getDatabaseState().subscribe(rdy => {
    if (rdy) {
      this.db.getExercices().subscribe(devs => {
        console.log(devs)
        this.myExercice = devs;
        this.myExercice = devs.filter(item => item.dayId == this.dayId)
      })
    }
  });
}

  addExercice(exerciceName, imgUrl?){ 
    this.db.addExercice(exerciceName, this.dayId, imgUrl)

  }

  deleteExercice(exerciceId){
    this.db.deleteExercice(exerciceId)
  }

  updateExercice(exercice){
    this.db.updateExercice(exercice)
  }

  addExercicePic(exercice){
    this.camera.getPicture(this.options).then((imageData) => {
      exercice.img = this.webview.convertFileSrc(imageData)
      this.updateExercice(exercice)
     }, (err) => {
      console.error(err)
     })
  }

async  getPicUrl(){
    let picUrl : string;
    await  this.camera.getPicture(this.options).then((imageData) => {
      picUrl= this.webview.convertFileSrc(imageData)
    }), (err) => {
      console.error(err)
    }
    return picUrl
  }

  async updateExerciceAlert(exercice){
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
            exercice.name = data.name
            this.updateExercice(exercice)
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteExerciceAlert(exerciceId){
    const alert = await this.alertController.create({
      header: 'Delete exercice?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Delete',
          handler: () => {
           this.deleteExercice(exerciceId);
          }
        }
      ]
    });

    await alert.present();
  }

  async addExerciceAlert(){
    let imgUrl;
    const alert = await this.alertController.create({
      header: 'Add a new exercice ',
      inputs: [
        {
          name: 'exercice',
          type: 'text',
          placeholder: 'Exercice name'
        },
      ],
      buttons: [
        {
          text: 'Add exercice pic',
          handler: () => {
           this.getPicUrl().then((res)=> {
            imgUrl = res 
           })
            return false

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: (data) => {
            this.addExercice(data.exercice, imgUrl)
          }
        }
      ]
    });
    await alert.present();
    };

  async editActionSheet(exercice) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Edit exercice',
      buttons: [{
        text: 'Edit name',
        icon: 'text-outline',
        handler: () => {
          this.updateExerciceAlert(exercice)
        }
      }, {
        text: 'Edit Image',
        icon: 'image-outline',
        handler: () => {
          this.addExercicePic(exercice)
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      },{
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.deleteExerciceAlert(exercice.id)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
    
  }