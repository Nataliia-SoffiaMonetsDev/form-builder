import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  form!: FormGroup;

  error!: string;

  get f() { return this.form.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  submit() {
    const requestBody = {
      email: this.f['email'].value,
      password: this.f['password'].value
    }
    this.authService.login(requestBody).pipe(first(), takeUntil(this.destroy$)).subscribe(data => {
      console.log(data)
      localStorage.setItem('access_token', data.accessToken)
      this.navigateToFormBuilder();
      Emitters.nameEmitter.emit(data.user.name);
    }, error => this.error = error.error);
  }

  navigateToFormBuilder() {
    this.router.navigate(['/form-builder']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
