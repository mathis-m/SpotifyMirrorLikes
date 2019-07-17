import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavItem} from '../interfaces/nav-item.interface';

@Component({
    selector: 'mm-top-nav',
    templateUrl: './top-nav.component.html'
})
export class TopNavComponent implements OnInit {
    @Input() items: NavItem[] = [];
    @Input() title = 'Navigation';
    @Output() public sidenavToggle = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    };

}
