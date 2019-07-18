import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResponsiveService {

    private readonly mobileQuery = '(max-width: 959px)';
    private readonly desktopQuery = '(min-width: 960px)';

    public isMobileChange: Subject<boolean> = new Subject();
    public isMobile: boolean;

    public isDesktopChange: Subject<boolean> = new Subject();
    public isDesktop: boolean;

    public breakpointChange: Subject<void> = new Subject();

    constructor(private breakpointObserver: BreakpointObserver) {
        this.subscribeToViewChanges();
    }

    private subscribeToViewChanges() {
        this.breakpointObserver.observe([
            this.mobileQuery
        ]).subscribe(result => {
            if (result.matches) {
                this.mobile = true;
                this.desktop = false;
            }
        });
        this.breakpointObserver.observe([
            this.desktopQuery
        ]).subscribe(result => {
            if (result.matches) {
                this.desktop = true;
                this.mobile = false;
            }
        });
        this.breakpointObserver.observe([
            ...Object.entries({...Breakpoints}).map(kv => kv[1])
        ]).subscribe(result => {
            if (result.matches) {
                this.breakpointChange.next();
            }
        });
    }

    private set mobile(value: boolean) {
        if (this.isMobile !== value) {
            this.isMobile = value;
            this.isMobileChange.next(value);
        }
    }

    private set desktop(value) {
        if (this.isDesktop !== value) {
            this.isDesktop = value;
            this.isDesktopChange.next(value);
        }
    }
}
