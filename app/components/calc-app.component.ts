import {Component} from "@angular/core";

/**
 * The bootstrapped wrapper component.
 */
@Component({
    selector: "calc-app",
    styles: [`
        calculator {
            margin: 4em auto;
        }
    `],
    template: `
        <calculator></calculator>
    `
})
export class CalcAppComponent { }