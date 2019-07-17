import {Injectable} from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-node';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    private spotifyApi: any;
    private readonly scopes: string[] = [
        'user-library-read',
        'playlist-modify-public',
        'playlist-read-private',
        'playlist-modify-private',
        'user-read-private',
        'user-read-email'
    ];
    private mirrorPlaylistName = 'My Liked Songs';

    public hasAccess = false;
    private redirectUri = window.location.href.indexOf('blank') === -1 ? 'http://127.0.0.1/callback/' : 'app://index.html/callback/';

    constructor(private route: ActivatedRoute, private router: Router) {
        this.spotifyApi = new SpotifyWebApi({
            clientId: 'd77f32e0fd864227be7a11ae2b835a3d',
            redirectUri: this.redirectUri
        });
    }

    getAuthUrl() {
        const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let array = new Uint8Array(40);
        crypto.getRandomValues(array);
        array = array.map(x => validChars.charCodeAt(x % validChars.length));
        const randomState = String.fromCharCode.apply(null, array);
        const baseUrl = `https://accounts.spotify.com/authorize`;
        const clientParam = `client_id=${this.spotifyApi.getClientId()}`;
        const redirectParam = `redirect_uri=${this.redirectUri}`;
        const scopesParam = `scope=${this.scopes.join('%20')}`;
        return `${baseUrl}?response_type=token&${clientParam}&${redirectParam}&${scopesParam}&state=${randomState}`;
    }

    async handleCallback() {
        const map1 = this.route.snapshot.fragment.split('&').map(kv => kv.split('='));
        const params = Array.from(map1).reduce((acc, [key, val]) => Object.assign(acc, {[key]: val}), {});
        // tslint:disable-next-line:no-string-literal
        const accessToken = params['access_token'];
        this.spotifyApi.setAccessToken(accessToken);
        this.hasAccess = true;
        this.router.navigate(['/mirror']);
    }

    public async mirrorPlaylist(mirrorName = this.mirrorPlaylistName) {
        const allLikedSongs = await this.getAllOf(this.getLikedSongs);
        let allPlaylists = await this.getAllOf(this.getMyPlaylists);
        let mirrorPlaylist = allPlaylists.find(playlist => playlist.name === mirrorName);
        if (!mirrorPlaylist) {
            const user = await this.spotifyApi.getMe().then(r => r.body);
            await this.spotifyApi.createPlaylist(user.id, mirrorName, {public: false});
            allPlaylists = await this.getAllOf(this.getMyPlaylists);
            mirrorPlaylist = allPlaylists.find(playlist => playlist.name === mirrorName);
        }
        const mirrorSongs = await this.getPlaylistSongs(mirrorPlaylist.id);
        if (mirrorSongs.length !== 0) {
            await this.removeAllTracksInPlaylist(mirrorPlaylist.id, mirrorPlaylist.snapshot_id, mirrorSongs.length);
        }
        const spotifyTrackUrls = allLikedSongs.map(song => `spotify:track:${song.id}`);
        const chunk = 100;
        for (let i = 0; i < spotifyTrackUrls.length; i += chunk) {
            await this.spotifyApi.addTracksToPlaylist(mirrorPlaylist.id, spotifyTrackUrls.slice(i, i + chunk));
        }
    }

    private async getAllOf(getSongsFn: (offset) => Promise<any[]>) {
        let offset = 0;
        const arr = [];
        while (true) {
            const partialArr = await getSongsFn(offset);
            arr.push(...partialArr);
            if (partialArr.length !== 50) {
                break;
            }
            offset += 50;
        }
        return arr;
    }

    private getLikedSongs = (offset: number) => {
        return this.spotifyApi.getMySavedTracks({
            limit: 50,
            offset
        }).then(res => res.body.items.map(i => i.track));
    };

    private getMyPlaylists = (offset: number) =>
        this.spotifyApi.getUserPlaylists({
            limit: 50,
            offset
        }).then(res => res.body.items);

    private getPlaylistSongs(playlistId: string): Promise<any[]> {
        return this.spotifyApi.getPlaylist(playlistId).then(res => res.body.tracks.items);
    }

    private removeAllTracksInPlaylist(playlistId: string, snapshotId: string, length: number) {
        const rangeArr = [];
        for (let i = 0; i < length; i++) {
            rangeArr.push(i);
        }
        return this.spotifyApi.removeTracksFromPlaylistByPosition(playlistId, rangeArr, snapshotId);
    }
}
