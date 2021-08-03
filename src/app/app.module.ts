import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import {TitleService} from './shared/services/title.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // seek3D modules
    PagesModule,
    SharedModule
  ],
  providers: [
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
