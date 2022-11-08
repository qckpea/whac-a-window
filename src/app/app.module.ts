import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import { PortalWindowComponent } from './portal-window.component';

@NgModule({
    declarations: [
        AppComponent,
        PortalWindowComponent
    ],
    imports: [
        BrowserModule,
        PortalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
