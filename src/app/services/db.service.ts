import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exercice } from '../models/exercice.model';
import { Days } from '../models/days.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
 
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  exercicess : Exercice[] = [];
  days= new BehaviorSubject([]);
  exercices = new BehaviorSubject([]);
  track = new BehaviorSubject([]);

  constructor(private plt: Platform, 
              private sqlitePorter: SQLitePorter, 
              private sqlite: SQLite, 
              private http: HttpClient) {

                  this.plt.ready().then(() => {
                      this.sqlite.create({
                        name: 'exercice.db',
                        location: 'default'
                            })
                        .then((db: SQLiteObject) => {
                          this.database = db;
                          this.seedDatabase();
                            });
                          });
                        }        

  seedDatabase() {
    this.http.get('assets/exercice.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadDays();
          this.loadExercices();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  
  getExercices(): Observable<Exercice[]> {
    this.exercices.subscribe((ex =>{
      this.exercicess = ex;
    }))
    return this.exercices.asObservable();
  }

  getDays(): Observable<Days[]>{
    return this.days.asObservable();
  }

  getTrack(): Observable<any[]> {
    return this.track.asObservable();
  }

  getExercicebyId( exerciceId : number): Exercice{
    const exercice = this.exercicess.find(exercice => exercice.id === exerciceId);
      if (!exercice) {
        throw new Error("id not found");
      } else {
         return exercice;
      }
  }

  loadExercices() {
    return this.database.executeSql('SELECT * FROM exercices', []).then(data => {
      let exercices: Exercice[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          exercices.push({ 
            id: data.rows.item(i).id,
            dayId: data.rows.item(i).dayId,
            name: data.rows.item(i).name, 
            set1: data.rows.item(i).set1,
            set2: data.rows.item(i).set2,
            set3: data.rows.item(i).set3,
            set4: data.rows.item(i).set4,
            img: data.rows.item(i).img
           });
        }
      }
      this.exercices.next(exercices);
    });
  }

  loadDays(){
    return this.database.executeSql('SELECT * FROM days', []).then(data => {
      let days: Days[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          days.push({ 
            id: data.rows.item(i).dayId,
            name: data.rows.item(i).name, 
           });
        }
      }
      this.days.next(days);
    });
      
  }
 
  getexercice(id): Promise<Exercice> {
    return this.database.executeSql('SELECT * FROM exercices WHERE id = ?', [id]).then(data => {
 
      return {
        id: data.rows.item(0).id,
        dayId: data.rows.item(0).dayId,
        name: data.rows.item(0).name, 
        set1: data.rows.item(0).set1, 
        set2: data.rows.item(0).set2, 
        set3: data.rows.item(0).set3, 
        set4: data.rows.item(0).set4, 
        img: data.rows.item(0).img
      }
    });
  }

  addExercice(name, dayId, img:string) {
    if (img == undefined) {
      img ="assets/img/default.png"
    }
    let data = [name, dayId, img];
    return this.database.executeSql('INSERT INTO exercices (name, dayId, img) VALUES (?, ?, ?)', data).then(data => {
      this.loadExercices();
    });
  }

  deleteExercice(id) {
    return this.database.executeSql('DELETE FROM exercices WHERE id = ?', [id]).then(_ => {
      this.loadExercices();
    });
  }

  updateExercice(exercice: Exercice) {
    let data = [exercice.name, exercice.set1, exercice.set2, exercice.set3, exercice.set4, exercice.img]
    return this.database.executeSql(`UPDATE exercices SET name = ?, set1 = ?, set2 = ?, set3 = ?, set4 = ?, img = ? WHERE id = ${exercice.id}`, data).then(data => {
      this.loadExercices();
    })
  }

  addDay(name) {
    return this.database.executeSql('INSERT INTO days (name) VALUES (?)', [name]).then(data => {
      this.loadDays();
    });
  }

  deleteDay(id) {
    return this.database.executeSql('DELETE FROM days WHERE dayId = ?', [id]).then(_ => {
      this.loadDays();
    });
  }

  updateDay(newname, dayId) {
    console.log(newname, dayId)
    return this.database.executeSql(`UPDATE days SET name = ? WHERE dayId = ${dayId}`, [newname]).then(data => {
      this.loadDays();
    })
  }

}  
