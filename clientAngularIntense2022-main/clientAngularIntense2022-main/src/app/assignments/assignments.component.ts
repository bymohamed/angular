import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  ajoutActive = false;
  assignments: Assignment[] = [];
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  dataSource = new MatTableDataSource(this.assignments);
  val : string = "";
  

  constructor(private _authServe: AuthService, private assignmentService: AssignmentsService, private router:Router) {}

  ngOnInit(): void {
    this.getAllAssignments();
    this.getAssignments();
  }

  getAllAssignments(){
    this.assignmentService.getAssignmentsPagine(1, 1000, this.val).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.docs);
    });
  }

  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.val).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      if (this.val == "") this.assignments = data.docs;
      else this.assignments = this.dataSource.filteredData;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  s = '';
  search(event: any){
    if(event.target.value == undefined){
      event.target.value=""
    }
    this.assignmentService.searchAssignments(this.page, this.limit, event.target.value).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    if(this.selectedValue=="tous" || this.selectedValue==undefined){
      this.page = 1;
      this.getAssignments();
    }
    else if (this.selectedValue=="rendu"){
      this.page = 1;
      this.getRenduAssignments();
    }
    else if (this.selectedValue=="nonrendu"){
      this.page = 1;
      this.getNonRenduAssignments();
    }
  }

  dernierePage() {
    if(this.selectedValue=="tous" || this.selectedValue==undefined){
      this.page = this.totalPages;
      this.getAssignments();
    }
    else if (this.selectedValue=="rendu"){
      this.page = this.totalPages;
      this.getRenduAssignments();
    }
    else if (this.selectedValue=="nonrendu"){
      this.page = this.totalPages;
      this.getNonRenduAssignments();
    }
  }

  pagePrecedente() {
    if(this.selectedValue=="tous" || this.selectedValue==undefined){
      this.page = this.prevPage;
      this.getAssignments();
    }
    else if (this.selectedValue=="rendu"){
      this.page = this.prevPage;
      this.getRenduAssignments();
    }
    else if (this.selectedValue=="nonrendu"){
      this.page = this.prevPage;
      this.getNonRenduAssignments();
    }
  }

  pageSuivante() {
    if(this.selectedValue=="tous" || this.selectedValue==undefined){
      this.page = this.nextPage;
      this.getAssignments();
    }
    else if (this.selectedValue=="rendu"){
      this.page = this.nextPage;
      this.getRenduAssignments();
    }
    else if (this.selectedValue=="nonrendu"){
      this.page = this.nextPage;
      this.getNonRenduAssignments();
    }
  }

  changeLimit() {
    if(this.selectedValue=="tous" || this.selectedValue==undefined){
      this.getAssignments();
    }
    else if (this.selectedValue=="rendu"){
      this.getRenduAssignments();
    }
    else if (this.selectedValue=="nonrendu"){
      this.getNonRenduAssignments();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.val = this.dataSource.filter;
    this.getAssignments();
  }

  logout(){
    this._authServe.logOut();
    console.log("connexion from login component")
    this.router.navigate(["/login"]);
  }

  choices: any[] = [{name: "tous", value: "tous"},{name: "rendu", value: "rendu"},{name: "non rendu", value: "nonrendu"}]
  selectedValue: string | undefined;

  filter(){
    console.log(this.selectedValue);
    
    if(this.selectedValue=="tous" || this.selectedValue==undefined){
      this.getAssignments();
    }
    else if (this.selectedValue=="rendu"){
      this.getRenduAssignments();
    }
    else if (this.selectedValue=="nonrendu"){
      this.getNonRenduAssignments();
    }
  }

  getRenduAssignments(){
    this.assignmentService.getRenduAssignmentsPagine(this.page, this.limit, this.val).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      if (this.val == "") this.assignments = data.docs;
      else this.assignments = this.dataSource.filteredData;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  getNonRenduAssignments(){
    this.assignmentService.getNonRenduAssignmentsPagine(this.page, this.limit, this.val).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      if (this.val == "") this.assignments = data.docs;
      else this.assignments = this.dataSource.filteredData;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

}
