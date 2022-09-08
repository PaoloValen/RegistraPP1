import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  user = {
    usuario: "",
    password: ""
  }
  field: string = ""
  constructor(private router: Router, public toastController: ToastController) { } // Se debe instanciar


  ingresar() {
    if (this.validateModel(this.user)) {
      this.presentToast("Bienvenido")
      // Se declara e instancia un elemento de tipo NavigationExtras
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user // Al estado se asignamos un objeto con clave y valor
        }
      };
      this.router.navigate(['/home'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
    }
    else{
      this.presentToast("Usuario y/o contrasenna incorrecta ")
    }
  } 

  validateModel(model: any) {
    //recorro todas las entradas que me entrega el Object entries y obtengo
    //su clave-valor
    for (var [key, value] of Object.entries(model)) {
      //verifico campo vacío
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }  
}
