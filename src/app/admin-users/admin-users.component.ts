import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';
import { AdminService } from '../admin.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  displayedColumns = ['email', 'isAdmin', 'edit'];
  dataSource = new MatTableDataSource();
  users: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>

  constructor(private adminservice: AdminService) { }


  ngOnInit() {
    this.adminservice.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      const ELEMENT_DATA = [];
      this.users = res;
      this.users.forEach(user => {
        const email = user.email
        const isAdmin = user.isAdmin
        ELEMENT_DATA.push({email, isAdmin});
    }); 
    this.dataSource.data = ELEMENT_DATA;
    this.dataSource.paginator = this.paginator;
  }

)}

onDelete(element) {
  this.adminservice.deleteUser(element.email).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
    const ELEMENT_DATA = [];
      this.users = res;
      this.users.forEach(user => {
        const email = user.email
        const isAdmin = user.isAdmin
        ELEMENT_DATA.push({email, isAdmin});
    }); 
    this.dataSource.data = ELEMENT_DATA;
    this.dataSource.paginator = this.paginator;
  }
)}
//copilot tavsiyesi tamamen
onAdmin(element) {
  this.adminservice.makeAdmin(element.email).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
    const ELEMENT_DATA = [];
      this.users = res;
      this.users.forEach(user => {
        const email = user.email
        const isAdmin = user.isAdmin
        ELEMENT_DATA.push({email, isAdmin});
    }); 
    this.dataSource.data = ELEMENT_DATA;
    this.dataSource.paginator = this.paginator;
  }
)}

ngOnDestroy() {
  this.unsubscribe.unsubscribe();
}

}

