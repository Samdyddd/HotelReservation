import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';

// 组件
import { AppComponent } from './app.component';
import { LoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

import { ErrorComponent } from './error/error.component';

import { ShareModule } from './share/share.module';

import { RegisterService } from './service/register.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegisterComponent,
    ErrorComponent
  ],
  imports: [
    ShareModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    RegisterService
  ]
})
export class AppModule {

}
