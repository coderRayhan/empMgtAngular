import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationalFormComponent } from './educational-form/educational-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmploymentFormComponent } from './employment-form/employment-form.component';
import { HomeComponent } from './home/home.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'personalInfo',
  component: PersonalFormComponent
},
{
  path: 'educationalInfo',
  component: EducationalFormComponent
},
{
  path: 'employmentInfo',
  component: EmploymentFormComponent
},
{
  path: 'employeeList',
  component: EmployeeListComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
