import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CalcAppComponent} from "./components/calc-app.component";
import {CalculatorComponent} from "./components/calculator.component";
import {FormsModule} from "@angular/forms";
import {CalculatorService} from "./services/calculator.service";
import {CalcActivateDirective} from "./directives/calc-activate.directive";

@NgModule({
    imports: [
        BrowserModule, FormsModule
    ],
    declarations: [
        CalcAppComponent, CalculatorComponent, CalcActivateDirective
    ],
    providers: [
        CalculatorService
    ],
    bootstrap: [
        CalcAppComponent
    ],
    exports: [
        CalculatorComponent
    ]
})
export class CalculatorModule { }