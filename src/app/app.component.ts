import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public token: string = '';
  public url = 'https://eboxtest.indenova.eu/';

  public active: boolean = false;

  constructor() {}

  ngOnInit() {
    this.createScript();
  }

  createScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      // script.src = `${environment.cdn}/${environment.version}/fdc-mf-videosignature.js`;
      // dev
      script.src = 'assets/fdc-mf-videosignature.js';
      script.id = 'fdc-mf-videosignature';

      script.onload = () => {
        resolve(true);
      };

      script.onerror = (err) => {
        reject('Ocurrio un error cargando el script del microfront');
      };

      if (!document.getElementById('fdc-mf-videosignature')) {
        document.body.appendChild(script);
      }
    });
  }

  openMF() {
    if(this.token) {
      this.active = true;
    }
  }

  response(e) {
    this.active = false;
    console.log(`Llego a test2 response: ${e}`);
  }

  close(e) {
    this.active = false;
    console.log(`Llego a test2 close: ${e}`);
  }

  cleanToken() {
    this.token = '';
  }
}
