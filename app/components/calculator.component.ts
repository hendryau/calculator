import {Component} from "@angular/core";
import {CalculatorService} from "../services/calculator.service";

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

        <div id="workspace">{{val || leftOperand || '0'}}</div>
        
        <div id="numKeys">
            <button *ngFor="let num of numKeys" calcActivate [keyVal]="num" (activate)="concatVal(num)">{{num}}</button
            ><button calcActivate [keyVal]="'.'" (activate)="concatVal('.')">.</button
            ><button calcActivate [keyVal]="'0'" (activate)="concatVal('0')">0</button
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

    private val: string;

    private leftOperand: number;

    private operator: string;

    private numKeys: string[] = ["7","8","9","4","5","6","3","2","1"];

    constructor(private calcService: CalculatorService) { }

    private clear() {
        this.val = null;
        this.leftOperand = null;
        this.operator = null;
    }

    private concatVal(val: string): void {
        if (!this.val) {
           this.val = "";
        }
        this.val = this.calcService.sanitize(this.val += val);
    }

    private deleteVal(): void {
        if (this.val != null) {
            this.val = this.val.slice(0, this.val.length - 1);
        }
        else if (this.leftOperand != null) {
            this.val = this.leftOperand.toString();
        }

        if (!this.val) {
            this.val = "0";
        }
    }

    private performEquals(): void {
        this.performOperation(this.operator);
        this.operator = null;
    }

    private performOperation(operator: string): void {
        if (this.operator) {
            let rightOperand = Number.parseFloat(this.val || "0");
            this.leftOperand = this.calcService.performOperation(this.operator, this.leftOperand, rightOperand);
        }
        else if (this.val) {
            this.leftOperand = Number.parseFloat(this.val);
        }

        this.operator = operator;
        this.val = null;
    }

}
