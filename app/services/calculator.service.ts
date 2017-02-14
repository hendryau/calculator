import {Injectable} from "@angular/core";

@Injectable()
export class CalculatorService {

    public performOperation(operator: string, l: number, r: number): number {
        switch(operator) {
            case "+":
                return l + r;
            case "-":
                return l - r;
            case "*":
                return l * r;
            case "/":
                return l / r; // TODO divide by 0, or just lean on js :)
            default:
                throw new Error("Unknown operator");
        }
    }

    public sanitize(input: string): string {
        if (!input){
            return "0";
        }

        let sanitized: string = this.sanitizeDash(
            this.sanitizeDot(
                this.sanitizeLeadingZeroes(
                    this.sanitizeUnwantedChars(input))));

        return sanitized || "0";
    }

    private sanitizeDash(input: string): string {
        let dashIndex: number = input.indexOf("-");

        if (dashIndex >= 0) {
            input = input.replace(/-/g, "");
        }

        if (dashIndex === 0) {
            input = "-" + input;
        }

        return input;
    }

    private sanitizeDot(input: string): string {
        let dotIndex: number = input.indexOf(".");

        if (dotIndex >= 0) {
            input = input.replace(/\./g, "");
            input = input.slice(0, dotIndex) + "." + input.slice(dotIndex);
        }

        return input;
    }

    private sanitizeLeadingZeroes(input: string): string {
        return input.replace(/^0+/, "");
    }

    private sanitizeUnwantedChars(input: string): string {
        return input.replace(/[^0-9\-\.]/g, "");
    }

}
