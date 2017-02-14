import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CalcAppComponent} from "./components/calc-app.component";
import {CalculatorComponent} from "./components/calculator.component";
import {FormsModule} from "@angular/forms";
import {CalculatorService} from "./services/calculator.service";
import {CalcBtnComponent} from "./components/calc-btn.component";
import {CalcActivateDirective} from "./directives/calc-activate.directive";

@NgModule({
    imports: [
        BrowserModule, FormsModule
    ],
    declarations: [
        CalcAppComponent, CalculatorComponent, CalcBtnComponent,
        CalcActivateDirective
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