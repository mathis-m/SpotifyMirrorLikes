import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavItem} from '../interfaces/nav-item.interface';

@Component({
    selector: 'mm-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    @Input() items: NavItem[] = [];
    @Output() sidenavClose = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    };

}
