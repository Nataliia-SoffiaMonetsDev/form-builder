import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  form!: FormGroup;

  error!: string;

  get f() { return this.form.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  submit() {
    const requestBody = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    }
    this.authService.register(requestBody).pipe(first(), takeUntil(this.destroy$)).subscribe( (data) => {
      this.navigateToLogin();
    }, error => this.error = error.error);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
