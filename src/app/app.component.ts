import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { CONSTANTS } from "./commons/constants/constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  token: string = "";
  url = "https://eboxtest.indenova.eu/";

  microfront: string;
  active: boolean = false;

  ambient = "dev";

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  openMF(microfront: string) {
    if (this.token) {
      this.microfront = microfront;
      this.render();
    }
  }

  async render() {
    try {
      await this.loadScript();
    } catch (e) {
      throw e;
    } finally {
      this.active = true;
      this.cd.detectChanges();
    }
  }

  loadScript() {
    const ambient = CONSTANTS[this.ambient];

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${ambient.cdn}/${this.microfront}/${this.microfront}.js`;
      // dev
      // script.src = 'assets/fdc-mf-validation.js';
      script.id = this.microfront;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = (err) => {
        reject("Ocurrio un error cargando el script del microfront");
      };

      if (!document.getElementById(this.microfront)) {
        document.body.appendChild(script);
      }
    });
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
    this.token = "";
  }
}
