import { NgZone, Renderer, Directive, Input } from '@angular/core';

@Directive({
    selector: '[focusDirective]'
})
export class FocusDirective {
    @Input() cssSelector: string

    constructor(
        private ngZone: NgZone,
        private renderer: Renderer
    ) { }

    ngOnInit() {

        console.log("In FocusDirective, cssSelector=%s", this.cssSelector);
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.renderer.selectRootElement(this.cssSelector).focus();
            }, 0);
        });
    }
}
