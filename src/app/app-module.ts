import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { AuthModule } from './core/auth/auth.module';
import { FeaturesModule } from './features/features-module';
import { provideToastr } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './shared/store/app.state';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    FeaturesModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    // For animations ??
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
