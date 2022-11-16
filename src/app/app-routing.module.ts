import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsBuilderComponent } from './forms-builder/forms-builder.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormBuilderGuard } from './_helpers/form-builder.guard';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'form-builder',
    component: FormsBuilderComponent,
    canActivate: [FormBuilderGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
