import {Component} from '@angular/core';
import {NavItem} from './nav';

@Component({
    selector: 'mm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor() {
        console.log('init');
    }
    title = 'SpotifyMirrorLikes';
    items: NavItem[] = [
        {
            name: 'Home',
            route: '/',
            matIcon: 'home'
        }
    ];
}
