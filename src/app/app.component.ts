import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public token: string = '';
  public url = 'https://eboxtest.indenova.eu/tokenCheck.jsp';
  public frame_src = 'https://eboxtest.indenova.eu';

  public element;

  constructor() {}

  ngOnInit() {}

  createScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://bpi-video-firma.azureedge.net/fdc-mf-videosignature/fdc-mf-videosignature.js';
      // script.src = 'assets/fdc-mf-videosignature.js';
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

  loadJS() {
    if (this.token) {
      this.createScript();
    }
  }

  cleanToken() {
    this.token = '';
  }

  response(e) {
    console.log(e);
  }
}
