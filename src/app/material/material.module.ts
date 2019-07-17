import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatInputModule
    ],
    exports: [
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatInputModule
    ]
})
export class MaterialModule {
}
