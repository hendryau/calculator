import {Component} from "@angular/core";
import {CalculatorService} from "../services/calculator.service";

/**
 * The calculator component.
 */
@Component({
    selector: "calculator",
    styles: [`
        :host {
            width: 400px;
            text-align: center;
            display: block;
            border: 1px solid black;
            padding: 2em;
            border-radius: 2em;
            font-family: "Oswald", Helvetica, Arial, sans-serif;
        }
        button {
            padding: 1em;
            border: 1px solid grey;
            border-radius: 1em;
        }
        #history, #workspace {
            text-align: right;
            overflow: auto;
            white-space: nowrap;
            width: 100%;
        }
        #workspace {
            font-size: 4em;
        }
        #history {
            font-size: 2em;
            color: grey;
        }
        #numKeys > button {
            width: 33%;
            font-size: 2em;
        }
        #opKeys > button {
            font-size: 1.5em;
        }
    `],
    template: `
        <div id="history">{{leftOperand}} {{operator}}</div>

        <div id="workspace">{{currVal || leftOperand || '0'}}</div>
        
        <div id="numKeys">
            <button *ngFor="let num of numKeys" calcActivate [keyVal]="num" (activate)="concatNum(num)">{{num}}</button
            ><button calcActivate [keyVal]="'.'" (activate)="concatNum('.')">.</button
            ><button calcActivate [keyVal]="'0'" (activate)="concatNum('0')">0</button
            ><button calcActivate [keyVals]="['=', 'Enter']" (activate)="performEquals()">=</button>
        </div>
        
        <div id="opKeys">
            <button calcActivate [keyVal]="'+'" (activate)="performOperation('+')">+</button
            ><button calcActivate [keyVal]="'-'" (activate)="performOperation('-')">-</button
            ><button calcActivate [keyVal]="'*'" (activate)="performOperation('*')">&times;</button
            ><button calcActivate [keyVal]="'/'" (activate)="performOperation('/')">&divide;</button
            ><button calcActivate [keyVals]="['c', 'C']" (activate)="clear()">C</button
            ><button calcActivate [keyVals]="['Delete', 'Backspace', 'Escape']" (activate)="deleteVal()">&larr;</button>
        </div>
    `
})
export class CalculatorComponent {

    /**
     * The value that is modified when buttons are clicked
     */
    private currVal: string;

    /**
     * The value that is set when an operation is performed.
     */
    private leftOperand: number;

    /**
     * The operator
     */
    private operator: string;

    /**
     * Helper array to ngFor over for "numpad" buttons.
     */
    private numKeys: string[] = ["7","8","9","4","5","6","3","2","1"];

    constructor(private calcService: CalculatorService) { }

    /**
     * Resets to initial state.
     */
    private clear() {
        this.currVal = null;
        this.leftOperand = null;
        this.operator = null;
    }

    /**
     * Append values to CalculatorComponent#currVal. Inputs are sanitized. For
     * example. See CalculatorService#sanitize for information on input sanitization.
     */
    private concatNum(val: string): void {
        if (!this.currVal) {
           this.currVal = "";
        }
        this.currVal = this.calcService.sanitize(this.currVal += val);
    }

    /**
     * Removes last character from CalculatorComponent#currVal.
     */
    private deleteVal(): void {
        if (this.currVal != null) {
            this.currVal = this.currVal.slice(0, this.currVal.length - 1);
        }
        else if (this.leftOperand != null) {
            this.currVal = this.leftOperand.toString();
        }

        if (!this.currVal) {
            this.currVal = "0";
        }
    }

    /**
     * Evaluate currVal and leftOperand with the currently specified operator.
     */
    private performEquals(): void {
        this.performOperation(this.operator);
        this.operator = null;
    }

    /**
     * Evaluate currVal and leftOperand with a provided operator.
     */
    private performOperation(operator: string): void {
        if (this.operator) {
            let rightOperand = Number.parseFloat(this.currVal || "0");
            this.leftOperand = this.calcService.performOperation(this.operator, this.leftOperand, rightOperand);
        }
        else if (this.currVal) {
            this.leftOperand = Number.parseFloat(this.currVal);
        }

        this.operator = operator;
        this.currVal = null;
    }

}
