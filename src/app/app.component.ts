import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rent';

  constructor(private login: LoginComponent) { }

  ngOnInit() {
    this.login.autoAuthUser();
  }
}
