import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';

@Component({
    selector: 'mm-mirror-likes',
    templateUrl: './mirror-likes.component.html',
    styleUrls: ['./mirror-likes.component.scss']
})
export class MirrorLikesComponent implements OnInit {

    constructor(public spotifyService: SpotifyService) {
    }

    ngOnInit() {
    }

}
