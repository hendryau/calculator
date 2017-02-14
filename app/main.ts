import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {CalculatorModule} from "./calculator.module";

platformBrowserDynamic().bootstrapModule(CalculatorModule)
    .catch((err: any) => console.error(err));