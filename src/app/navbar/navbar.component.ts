import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  name: string = 'user';
  showExitandName = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    Emitters.nameEmitter.subscribe(data => {
      this.name = data;
      this.showExitandName = true;
    })
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logOut(){
    localStorage.clear();
    this.navigateToLogin();
    this.showExitandName = false;
  }

}
