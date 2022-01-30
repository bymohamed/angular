import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatTableDataSource} from '@angular/material/table';


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
  

  constructor(private assignmentService: AssignmentsService) {}

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

  search(event: any){
    console.log("zebii");
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
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage;
      this.getAssignments();
  }

  changeLimit() {
    this.getAssignments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.val = this.dataSource.filter;
    this.getAssignments();
  }
}
