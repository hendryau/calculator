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

    @Input() private keyVal: string;

    @Input() private keyVals: string[];

    @Output() private activate: EventEmitter<any> = new EventEmitter<any>();

    private doActivate(): void {
        this.activate.emit();

        // TODO make color configurable
        this.elementRef.nativeElement.style.backgroundColor = "lightblue";

        setTimeout(() => this.elementRef.nativeElement.style.backgroundColor = "", 300);
    }

    @HostListener("click")
    private onClick(): void {
        this.doActivate();
    }

    // TODO improve key recognition... for example ctrl + for zoom triggers the + key
    @HostListener("window:keydown", ["$event"])
    private onKeydown(evt: KeyboardEvent): void {
        if (evt.key === this.keyVal || this.keyVals && this.keyVals.indexOf(evt.key) >= 0) {
            this.doActivate();
        }
    }

}
