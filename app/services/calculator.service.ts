import {Injectable} from "@angular/core";

/**
 * Service for common calculator operations.
 */
@Injectable()
export class CalculatorService {

    /**
     * Execute the provided expression.
     */
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

    /**
     * Sanitize a provided value. Removes unwanted characters, extra "." characters,
     * "-" characters that are not at the front of the string. Can produce strings that
     * cannot be parsed to a valid number.
     */
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

    /**
     * Removes any dash not at the front of the provided input.
     */
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

    /**
     * Removes all dot characters except the first one in the provided input.
     */
    private sanitizeDot(input: string): string {
        let dotIndex: number = input.indexOf(".");

        if (dotIndex >= 0) {
            input = input.replace(/\./g, "");
            input = input.slice(0, dotIndex) + "." + input.slice(dotIndex);
        }

        return input;
    }

    /**
     * Trims leading zeroes.
     */
    private sanitizeLeadingZeroes(input: string): string {
        return input.replace(/^0+/, "");
    }

    /**
     * Remove characters that aren't dots, dashes, or digits.
     */
    private sanitizeUnwantedChars(input: string): string {
        return input.replace(/[^0-9\-\.]/g, "");
    }

}
