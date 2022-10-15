import { Component, Inject, OnInit } from '@angular/core';
import { ComponentFactoryBoundToModule } from '@angular/core/src/linker/component_factory_resolver';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  cars: any;
  path: any;
  constructor(private userservice: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userservice.selectedCars.subscribe(res => {
      this.cars = res;
      this.path = this.userservice.path;
    });
  }

  onRent(car) {
    const from = localStorage.getItem('from');
    const until = localStorage.getItem('until');
    const fromDate = moment(from).format('YYYY-MM-DD');
    const untilDate = moment(until).format('YYYY-MM-DD');
    this.userservice.rentCar(car._id, from, until, fromDate, untilDate).subscribe(res => {console.log(res); });


    this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
   

}
