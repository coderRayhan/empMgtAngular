import { Component, OnInit } from '@angular/core';
import { EmploymentInfo } from '../Model/EmploymentInfo';
import { NgForm } from '@angular/forms';
import { restDataService } from '../Shared/restData.service';
import { Department } from '../Model/Department';
import { ToastrService } from 'ngx-toastr';
import { PersonalInfo } from '../Model/PersonalInfo';

@Component({
  selector: 'app-employment-form',
  templateUrl: './employment-form.component.html',
  styleUrls: ['./employment-form.component.css']
})
export class EmploymentFormComponent implements OnInit {

  constructor(private service : restDataService, private toastr : ToastrService) { 
    this.refreshData();
    this.getDepartmentsList();
    this.getEmployeeId();
    
  }

  ngOnInit(): void {
  }

  employmentData : EmploymentInfo[] = [];
  departmentData : Department[] =[];
  employmentInfo : EmploymentInfo = new EmploymentInfo();
  dep: Department = new Department();

  getValidationMessages(state : any, thingName? : string) : string[]{
    //console.log(state);
    
    let messages : string[] = [];
    let thing : string = state.path || thingName;
    if(state.errors){
      for(let errorName in state.errors){
        switch(errorName){
          case "required":
            messages.push(`You must enter a ${thing}`);
            break;
          case "maxlength":
            messages.push(`A ${thing} must be less than ${state.errors['maxlength'].requiredLength} character`);
            break;
          case "minlength":
            messages.push(`A ${thing} must be more than ${state.errors['minlength'].requiredLength} character`);
            break;
          case "pattern":
            messages.push(`${thing} contains illegal character`);
            break;
        }
      }
    }
    return messages;
  }



  getFormValidationMessages(form : NgForm) : string[]{
    let messages : string[] = [];
    Object.keys(form.controls).forEach(e => this.getValidationMessages(form.control[e], e).forEach(m => messages.push(m)));
    return messages;
  }



  //http://localhost:5000/employmentinfo
  employmentPostUrl : string = "http://localhost:5000/employmentinfo/create";
  employmentGetUrl : string = "http://localhost:5000/employmentinfo/index";
  employmentPutUrl : string = "http://localhost:5000/employmentinfo/Edit/";
  employmentDelUrl : string = "http://localhost:5000/employmentinfo/Delete";
  departmentGetUrl : string = "http://localhost:5000/home/getDepartments";
  personalGetUrl : string = "http://localhost:5000/personalinfo/Index";



  personalData : PersonalInfo[]=[];
  

  onSubmit(form : NgForm){
    console.log(this.employmentInfo);
    
    this.service.postData(this.employmentPostUrl, this.employmentInfo).subscribe(res => {
      this.refreshData();
      form.form.reset();
      this.toastr.success('Submited Successfully', 'Employment Info form');
      this.employmentInfo = new EmploymentInfo();
    }, err => {
      console.log(err);
    }); 
  }




  getDataToEdit(selectedData : EmploymentInfo){
    this.employmentInfo = Object.assign({}, selectedData);
  }



  updateData(id : number, form:NgForm){
    console.log(this.employmentPutUrl+id);
    
    this.service.putData(this.employmentPutUrl+id, this.employmentInfo).subscribe(res=>{
      this.refreshData();
      form.form.reset();
      this.toastr.success('Updated successfully', 'Employment info form');
      this.employmentInfo = new EmploymentInfo();
    }, err=>{console.log(err);
    });
  }



  deleteData(id : number){
    console.log(this.employmentDelUrl);
    this.service.deleteData(id, this.employmentDelUrl).subscribe(res => {
      this.refreshData();
      this.toastr.success('Delete Successful', 'Employment Info Form ');
    }, err => {console.log(err)});
  }




  refreshData(){
    this.service.getData(this.employmentGetUrl).subscribe(data => this.employmentData = data);
  }



  getDepartmentsList(){
    return this.service.getData(this.departmentGetUrl).subscribe(data => {this.departmentData = data
     })
  }


  get ddepartment(){
    this.departmentData.forEach(element => element);
    return this.departmentData;
    
    };
      

  departmentPopulate(value : string){
    this.employmentInfo.departmentId = Number(value);
    
  }



  getEmployeeId(){
    this.service.getData(this.personalGetUrl).subscribe(data => this.personalData = data);
  }


  get empIdName(){
    this.personalData.forEach(element => element);
    return this.personalData;
  }


  convertIdToNumber(value : string){
    console.log(value);
    
    this.employmentInfo.employeeId = Number(value);
  }


}
