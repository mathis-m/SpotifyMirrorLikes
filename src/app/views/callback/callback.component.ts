import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';

@Component({
    selector: 'mm-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

    constructor(private spotifyService: SpotifyService) {
    }

    ngOnInit() {
        this.spotifyService.handleCallback();
    }

}
