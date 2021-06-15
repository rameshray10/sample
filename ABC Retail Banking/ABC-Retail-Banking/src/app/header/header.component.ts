import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BankingService } from '../services/banking.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed = true;
  customerId: string = '';
  username: string = '';
  rolename: string = '';

  constructor(private router: Router, private authservice: AuthService) {
    let x = authservice.currentUserValue;

    this.customerId = x.CustomerId;
    this.username = x.UserName;
    this.rolename = x.roleName;
    if (this.username == '' || this.username == undefined) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {}
  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
  navRegistration() {
    const navigationExtras: NavigationExtras = {
      state: { example: this.customerId },
    };
    this.router.navigate(['app/registration'], navigationExtras);
  }
}
