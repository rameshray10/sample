import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template:`<app-login></app-login><router-outlet></router-outlet>`,
  styleUrls: []
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
