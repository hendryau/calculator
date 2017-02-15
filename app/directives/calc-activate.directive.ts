import {Directive, ElementRef, HostListener, Input, EventEmitter, Output} from "@angular/core";

/**
 * Activates when its elementRef is clicked or the corresponding key values that are
 * mapped to it are pressed.
 *
 * For example, when I click the "1" button in the page or if I press my "1" key on
 * my physical keyboard, CalcActivateDirective#activate is emitted if this element is
 * mapped to the "1" key.
 *
 */
@Directive({
    selector: "[calcActivate]"
})
export class CalcActivateDirective {

    constructor(private elementRef: ElementRef) { }

    /**
     * Causes the directive to activate if it equals a KeyboardEvent#key. Note that
     * this is ignored if CalcActivateDirective#keyVals is also set.
     */
    @Input() private keyVal: string;

    /**
     * Causes the directive to activate if any of its values equals a
     * KeyboardEvent#key.
     */
    @Input() private keyVals: string[];

    /**
     * Emitted when the elementRef is clicked or the mapped keys are pressed.
     */
    @Output() private activate: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Called when mapped key is pressed or elementRef is clicked. Sets background-color
     * of element temporarily.
     */
    private doActivate(): void {
        this.activate.emit();

        // TODO make color configurable
        this.elementRef.nativeElement.style.backgroundColor = "lightblue";

        setTimeout(() => this.elementRef.nativeElement.style.backgroundColor = "", 300);
    }

    /**
     * Listen for clicks on the element.
     */
    @HostListener("click")
    private onClick(): void {
        this.doActivate();
    }

    /**
     * Listen for "keydown" events corresponding to mapped keys.
     */
    @HostListener("window:keydown", ["$event"])
    private onKeydown(evt: KeyboardEvent): void {
        // TODO improve key recognition... for example "ctrl +" for zoom triggers the "+" key to activate
        if (evt.key === this.keyVal || this.keyVals && this.keyVals.indexOf(evt.key) >= 0) {
            this.doActivate();
        }
    }

}
