import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil, interval, switchMap} from 'rxjs';

import { PortalWindowComponent } from './portal-window.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild(PortalWindowComponent) child?: PortalWindowComponent | null;
    
    title = 'Whac-A-Window';
    score = 0;
    imgUrl = '';

    private readonly _start = new Subject<void>();
    private readonly _stop = new Subject<void>();

    newInterval() {
        return interval(1000)
                .pipe(
                    takeUntil(this._stop)
                );
    };
    
    timer$ = this._start
    .pipe(
        switchMap(() => this.newInterval())
    );

    sub = new Subscription;
    
    ngOnInit()
    {
        this.imgUrl = window.location.href + 'assets/mole.png';
        
        this.sub = this.timer$.subscribe(() => {
            this.child?.whack();
        });

        this._start.next();
    }
    
    onClick()
    {
        this._start.next();
        this.score++;
        this.child?.whack();
    }

    stop()
    {
        this._stop.next();
        this.child?.window?.focus();
    }

    ngOnDestroy(): void
    {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
