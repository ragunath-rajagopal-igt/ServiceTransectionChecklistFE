// angular import
import { NgModule } from '@angular/core';

// project import
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './theme/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HttpInterceptorService } from './http/http.interceptor';
import { AuthService } from './shared/auth.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, MaterialModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [  
    provideAnimationsAsync(),
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true // Allows multiple interceptors
    }
  ]
})
export class AppModule {}
