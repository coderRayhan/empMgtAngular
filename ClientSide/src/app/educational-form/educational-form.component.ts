import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EducationalFormGroup } from '../formsModel/educationalForm.model';
import { EducationalInfo } from '../Model/EducationalInfo';
import { restDataService } from '../Shared/restData.service';

@Component({
  selector: 'app-educational-form',
  templateUrl: './educational-form.component.html',
  styleUrls: ['./educational-form.component.css']
})
export class EducationalFormComponent implements OnInit {

  educationalPostUrl : string = "http://localhost:5000/educationalinfo/create";
  educationalGetUrl : string = "http://localhost:5000/educationalinfo/index";
  educationalPutUrl : string = "http://localhost:5000/educationalinfo/Edit/";
  educationalDelUrl : string = "http://localhost:5000/educationalinfo/Delete";


  educationalData : EducationalInfo[] = [];


  editOption : boolean = true;

  constructor(private service : restDataService, private toastr : ToastrService) { 
    this.refreshData();
  }

  ngOnInit(): void {
  }



  educationalInfo : EducationalInfo = new EducationalInfo();
  form : EducationalFormGroup = new EducationalFormGroup();



  onSubmit(){
    if(this.editOption){
      this.insertData();
    }
    else{
      this.updateData(this.educationalInfo.id);
      this.editOption = true;
    }
  }




  insertData(){
    this.service.postData(this.educationalPostUrl, this.educationalInfo).subscribe(res => {
      this.form.reset();
      this.toastr.success('Submitted Successfully', 'Educational Info Form');
      this.educationalInfo = new EducationalInfo();
      this.refreshData();
    }, err => {});
  }



  getDataToEdit(selectedData : EducationalInfo){
    this.educationalInfo = Object.assign({}, selectedData);
    this.editOption = false;
  }



  updateData(id : number){
    console.log(this.educationalPutUrl+id);
    
    this.service.putData(this.educationalPutUrl+id, this.educationalInfo).subscribe(res=>{
      this.form.reset();
      this.toastr.success('Updated Successfully', 'Educational Info Form');
      this.educationalInfo = new EducationalInfo();
      this.refreshData();
    }, err=>{console.log(err);
    });
  }


  deleteData(id : number){
    this.service.deleteData(id, this.educationalDelUrl).subscribe(res => {
      this.refreshData();
      this.toastr.success('Delete successful', 'Educational Info');
    }, err => {console.log(err)});
  }



  refreshData(){
    this.service.getData(this.educationalGetUrl).subscribe(data => this.educationalData = data);
  }


 
}
