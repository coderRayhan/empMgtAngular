import { Component, OnInit } from '@angular/core';
import { ViewModel } from '../Model/viewModel';
import { restDataService } from '../Shared/restData.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  getEmployeeListUrl : string = "http://localhost:5000/home/getAllInfo";

  viewModel : ViewModel[] = [];
  constructor(private service : restDataService) {
    this.getEmployeeList()
   }

   

  ngOnInit(): void {
  }

  getEmployeeList(){
    this.service.getData(this.getEmployeeListUrl).subscribe(res =>{this.viewModel = res});
  }


  display = false;


  toggle(){
    this.display = !this.display
  }

}
