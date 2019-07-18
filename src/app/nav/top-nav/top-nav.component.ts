import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NavItem} from '../interfaces';
import {Router} from '@angular/router';
import {ResponsiveService} from '../../services/responsive.service';

@Component({
    selector: 'mm-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, AfterViewInit {
    @Input() items: NavItem[] = [];
    @Input() title = 'Navigation';
    @Output() public sidenavToggle = new EventEmitter();
    @ViewChild('toolbar', {static: true}) toolbar: ElementRef;

    public height: string;

    public onToggleSidenav = () => this.sidenavToggle.emit();

    constructor(public router: Router, public responsiveService: ResponsiveService) {
        this.responsiveService.breakpointChange.subscribe(() => this.setHeight());
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.setHeight();
    }

    private setHeight() {
        // @ts-ignore
        this.height = `${this.toolbar._elementRef.nativeElement.getBoundingClientRect().height}px`;
    }
}
