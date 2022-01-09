import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from '@angular/fire';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    public chatService: ChatService
  ) { }


  ingresar(proveedor:string){
    console.log(proveedor);
    this.chatService.loginGoogle(proveedor);
  }

  salir(){
    this.chatService.logout();
  }

}
