import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CallbackComponent, ConnectSpotifyComponent, HomeComponent, MirrorLikesComponent} from './views';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, {
        path: 'connect',
        component: ConnectSpotifyComponent
    },
    {
        path: 'mirror',
        component: MirrorLikesComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
