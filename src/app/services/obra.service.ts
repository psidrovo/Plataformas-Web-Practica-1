import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private firestore: AngularFirestore,
    private http: HttpClient) { }

  agregarObra(obras: any): Promise<any> {
    return this.firestore.collection('obras').add(obras);
  }

  getObras(): Observable<any> {
    return this.firestore.collection('obras', ref => ref.orderBy('year', 'desc')).snapshotChanges();
  }

  eliminarObra(id: string): Promise<any> {
    return this.firestore.collection('obras').doc(id).delete();
  }

  getObra(id: string): Observable<any> {
    return this.firestore.collection('obras').doc(id).snapshotChanges();
  }

  actualizarObra(id: string, data: any): Promise<any> {
    return this.firestore.collection('obras').doc(id).update(data);
  }

  getObrasJason() { 
    return this.http.get<any>('assets/obras.json').toPromise().then(res => <ObraService[]>res.data).then(data => { return data; }); 
  }

  async subirImagen(nombre:string,imgBase64:any){
    const storageRef=firebase.app().storage().ref();
    try{
      let respuesta=await storageRef.child("users/"+nombre).putString(imgBase64,'data_url');
      return await respuesta.ref.getDownloadURL();
    }catch(err){
      console.log(err);
      return null;
    }
  }

}
