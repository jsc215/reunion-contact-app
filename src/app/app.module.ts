import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { RegistrationValidator } from './shared/register.validator';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegiFormComponent } from './regi-form/regi-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatPaginator } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { AlertComponent } from './alert.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegiFormComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, AlertComponent, LoginComponent, RegiFormComponent, HomeComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    MatToolbarModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    UserService,
    AuthGuard,
    AuthenticationService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
