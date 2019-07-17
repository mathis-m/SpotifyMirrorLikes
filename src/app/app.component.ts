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
        },
        {
            name: 'Connect Spotify',
            route: '/connect',
            matIcon: 'link'
        },
        {
            name: 'Mirror Likes',
            route: '/mirror',
            matIcon: 'swap_horiz'
        }
    ];
}
