import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';

@Component({
    selector: 'mm-connect-spotify',
    templateUrl: './connect-spotify.component.html',
    styleUrls: ['./connect-spotify.component.scss']
})
export class ConnectSpotifyComponent implements OnInit, AfterViewInit {
    private authUrl: string;

    constructor(public spotifyService: SpotifyService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        if (!this.spotifyService.hasAccess) {
            this.authUrl = this.spotifyService.getAuthUrl();
            console.log(this.authUrl);
        }
    }

    openAuthUrl() {
        window.location.href = this.authUrl;
    }
}
