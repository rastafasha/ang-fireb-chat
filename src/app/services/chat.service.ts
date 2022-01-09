import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from '@angular/fire';
// import { User } from  'firebase';

import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // user: User;

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: Mensaje[] = [];
  public usuario: any = {};


  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,

  ) {
    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if(!user){
        return
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
  }




  loginGoogle(proveedor:string){
    const result =  this.afAuth.signInWithPopup(new auth.proveedor);

    return result;
  }

   register(email: string, password: string){
     const result =  this.afAuth.createUserWithEmailAndPassword(
       email,
       password
       );
       return result;
  }

   logout(){
     this.afAuth.signOut();
  }

   cargarMensaje(){
     this.itemsCollection = this.afs.collection<Mensaje>('chats', ref =>ref.orderBy('date', 'desc')
                                                                            .limit(10) );

     return this.itemsCollection.valueChanges().pipe(
      map( (mensajes: Mensaje[] ) => {
        console.log(mensajes);
        this.chats = [];

        for(let mensaje of mensajes){
          this.chats.unshift(mensaje);
        }

        return this.chats;

        // this.chats = mensajes;
      })
)

   }


   agregarMensaje(texto: string ){
    let mensaje: Mensaje ={
      name: 'Demo',
      message: texto,
      date: new Date().getTime()
    }
    return this.itemsCollection.add(mensaje);
   }





}
