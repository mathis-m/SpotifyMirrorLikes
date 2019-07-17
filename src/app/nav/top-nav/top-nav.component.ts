import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavItem} from '../interfaces/nav-item.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'mm-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
    @Input() items: NavItem[] = [];
    @Input() title = 'Navigation';
    @Output() public sidenavToggle = new EventEmitter();

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    };

}
