import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // currentUser: User;
  dataSource;
  displayedColumns = ['firstName', 'lastName', 'email'];
  users: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource();
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      const user = Array.from((this.users = users['users'].map((mapUser) => mapUser)));
      this.dataSource = new MatTableDataSource(user);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteUser(_id: string) {
    this.userService.deleteUser(_id).subscribe((res) => {
      return this.getUsers();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      const user = Array.from((this.users = users['users'].map((mapUser) => mapUser)));
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
