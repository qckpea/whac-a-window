import { AfterViewInit, ApplicationRef, Component, Injector, OnDestroy, ViewChild } from '@angular/core';
import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';

@Component({
    selector: 'app-portal-window',
    template: `
        <ng-container *cdkPortal>
            <ng-content></ng-content>
        </ng-container>
    `,
    styles: []
})
export class PortalWindowComponent implements OnDestroy, AfterViewInit {
    @ViewChild(CdkPortal) portal?: CdkPortal;

    public get window() : Window | null {
        return this.externalWindow?? null;
    }
    
    private externalWindow?: Window | null;
    private host?: DomPortalOutlet | null;

    private readonly windowWidthInPixel = 160;
    private readonly windowHeightInPixel = 120;

    private readonly maxX = screen.width - this.windowWidthInPixel;
    private readonly maxY = screen.height - this.windowHeightInPixel;

    imgUrl: string = '';

    constructor(
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}
    
    ngAfterViewInit(): void
    {
        this.whack();
    }
    
    ngOnDestroy(): void
    {
        this.externalWindow?.close();
    }
    
    whack()
    {
        this.host?.detach();
        this.externalWindow?.close();
        
        const left = Math.floor(Math.random() * this.maxX);
        const top = Math.floor(Math.random() * this.maxY);
        
        this.externalWindow = window.open(
            '', 
            '',
            `
            width = ${this.windowWidthInPixel},
            height = ${this.windowWidthInPixel},
            left = ${left}, 
            top = ${top}, 
            resisable = false
            `
        );

        this.imgUrl = this.externalWindow?.opener.document.URL + 'assets/mole.png';
            
        this.host = new DomPortalOutlet(
            this.externalWindow?.document.body as any as HTMLElement,
            undefined,
            this.appRef,
            this.injector,
        );
            
        const nodes = document.querySelectorAll('style');
        nodes.forEach(node => {
            this.externalWindow?.document.head.appendChild(node.cloneNode(true));
        });
            
        this.host.attach(this.portal);
    }
            
}
            