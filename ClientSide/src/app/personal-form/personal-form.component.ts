import { Component, OnInit } from '@angular/core';
import { PersonalInfo } from '../Model/PersonalInfo';
import { NgForm } from '@angular/forms';
import { restDataService } from '../Shared/restData.service';
import { ToastrService } from 'ngx-toastr';
import { Division } from '../Model/Division';
import { District } from '../Model/District';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {

  personaPostlUrl : string = "http://localhost:5000/personalinfo/create";
  // personaPostlUrl : string = "http://localhost:44366/personalinfo/create";
  personaGetlUrl : string = "http://localhost:5000/personalinfo/Index";
  personalPutUrl : string = "http://localhost:5000/personalinfo/Edit/";
  personalDelUrl : string = "http://localhost:5000/personalinfo/Delete";
  divisionGetUrl : string = "http://localhost:5000/home/getDivision";
  districtGetUrl : string = "http://localhost:5000/home/getDistrict/";

  personalData : PersonalInfo[] = [];
  divisionData : Division[] = [];
  districtData : District[] = [];

  constructor(private service : restDataService, private toastr : ToastrService) {
    this.refreshData();
    this.getDivision();
   }

  ngOnInit(): void {
  }



  personalInfo : PersonalInfo = new PersonalInfo();



  onSubmit(form : NgForm){
    console.log(this.personalInfo);
    
    this.service.postData(this.personaPostlUrl, this.personalInfo).subscribe(res => {
      this.refreshData();
      form.form.reset();
      this.toastr.success('Submitted Successfully', 'Personal Info Form');
      this.personalInfo = new PersonalInfo();
    }, err => {console.log(err);})
  }




  updateData(id: number, form:NgForm){
    console.log(this.personalPutUrl+id);
    
    this.service.putData(this.personalPutUrl+id, this.personalInfo).subscribe(res=>{
      this.refreshData();
      form.form.reset();
      this.toastr.success('Updated Successfully', 'Personal Info form');
    }, err=>{console.log(err);
    })
  }


  deleteData(id : number){
    console.log(this.personalDelUrl);
    this.service.deleteData(id, this.personalDelUrl).subscribe(res => {
      this.refreshData();
      this.toastr.success('Delete Successful', 'Employment Info Form ');
    }, err => {console.log(err)});
  }




  getDataToEdit(selectedRecord : PersonalInfo){
    this.personalInfo = Object.assign({}, selectedRecord);
  }




  refreshData(){
    this.service.getData(this.personaGetlUrl).subscribe(data => this.personalData = data);
  }

  getDivision(){
    this.service.getData(this.divisionGetUrl).subscribe(data =>  {this.divisionData = data});
  }

  getDistrict(id : number){
    this.service.getData(this.districtGetUrl+id).subscribe(data => {this.districtData = data});
  }


  onChange(event : any){

    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e : any) => {
        this.personalInfo.image = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
}
