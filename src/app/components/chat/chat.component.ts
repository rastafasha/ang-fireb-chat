import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../interfaces/mensaje.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  message:string = "";
  elemento: any;

  constructor(
    public  chatService: ChatService

  ) {
    this.chatService.cargarMensaje().subscribe( ()=>{
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje(){
    console.log(this.message);
    if(this.message.length === 0){
      return;
    }
    this.chatService.agregarMensaje(this.message)
      .then( ()=>this.message = "")
      .catch( (err)=>console.error('Error al enviar', err) );


  }

}
