import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { EmployeeList } from './components/employee-list/employee-list';
import { AddEmployee } from './components/add-employee/add-employee';
import { UpdateEmployee } from './components/update-employee/update-employee';
import { ViewEmployee } from './components/view-employee/view-employee';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: EmployeeList },
  { path: 'add', component: AddEmployee },
  { path: 'update/:id', component: UpdateEmployee },
  { path: 'view/:id', component: ViewEmployee }
];