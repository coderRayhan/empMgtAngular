import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EducationalFormComponent } from './educational-form/educational-form.component';
import { EmploymentFormComponent } from './employment-form/employment-form.component';
import { HeaderComponent } from './header/header.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { restDataService } from './Shared/restData.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EducationalFormComponent,
    EmploymentFormComponent,
    HeaderComponent,
    PersonalFormComponent,
    EmployeeListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [restDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
