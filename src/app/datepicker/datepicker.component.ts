import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  constructor(private userservice: UserService) { }

  ngOnInit() {
  }

  onSearch(form: NgForm) {
    const from0 = form.value.dateInput[0];
    const  until0 = form.value.dateInput[1];
    const from = moment(from0).format('YYYYMMDD');
    const until = moment(until0).format('YYYYMMDD');  
    localStorage.setItem('from', from);
    localStorage.setItem('until', until);
    this.userservice.getCars(from, until).subscribe(res => this.userservice.selectedCars.next(res));
  }

}
