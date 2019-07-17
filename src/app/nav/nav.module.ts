import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopNavComponent} from './top-nav/top-nav.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {MaterialModule} from '../material/material.module';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    declarations: [TopNavComponent, SideNavComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        MaterialModule,
    ],
    exports: [
        TopNavComponent,
        SideNavComponent
    ]
})
export class NavModule {
}
