import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public token: string = '';
  public url = 'https://eboxtest.indenova.eu/tokenCheck.jsp';

  public element;

  constructor() {}

  ngOnInit() {
    this.loadJS('abc');
  }

  createScript() {
    var scriptTag = document.createElement('script');
    scriptTag.src =
      'https://bpi-video-firma.azureedge.net/fdc-mf-videosignature/fdc-mf-videosignature.js';

    setTimeout(() => {
      document.body.appendChild(scriptTag);
    }, 2000);
  }

  loadJS(token: string) {
    if (token) {
      this.token = token;
      this.createScript();
    }
  }

  response(e) {
    console.log(e);
  }
}
