import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private url = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  // 1. HELPER: Get Auth Headers for protected routes
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  // 2. LOGIN
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, {
      query: `
        query Login($email: String, $password: String) {
          login(email: $email, password: $password) {
            token
            user { id username }
          }
        }
      `,
      variables: { email, password }
    });
  }

  // 3. SIGNUP
  signup(username: string, email: string, password: string) {
    return this.http.post<any>(this.url, {
      query: `
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password) {
            id
            username
          }
        }
      `,
      variables: { username, email, password }
    });
  }

  // 4. GET ALL EMPLOYEES
  getAllEmployees() {
    return this.http.post<any>(this.url, {
      query: `
        query {
          getAllEmployees {
            id first_name last_name email department designation employee_photo 
    salary date_of_joining
          }
        }
      `
    }, { headers: this.getHeaders() });
  }

  // 5. SEARCH EMPLOYEES
  searchEmployee(designation: string, department: string) {
    return this.http.post<any>(this.url, {
      query: `
        query SearchEmployee($designation: String, $department: String) {
          searchEmployee(designation: $designation, department: $department) {
            id first_name last_name email department designation employee_photo
          }
        }
      `,
      variables: { designation, department }
    }, { headers: this.getHeaders() });
  }

  // 6. GET SINGLE EMPLOYEE (For View & Update Screens)
  getEmployeeById(id: string) {
    return this.http.post<any>(this.url, {
      query: `
        query GetEmployeeById($id: ID!) {
          getEmployeeById(id: $id) {
            id first_name last_name email department designation salary date_of_joining employee_photo
          }
        }
      `,
      variables: { id }
    }, { headers: this.getHeaders() });
  }

  // 7. ADD EMPLOYEE (With optional Photo Upload)
  addEmployee(emp: any, file: File | null = null) {
    const query = `
      mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $designation: String!, $salary: Float!, $date_of_joining: String!, $department: String!, $employee_photo: Upload) {
        addEmployee(first_name: $first_name, last_name: $last_name, email: $email, designation: $designation, salary: $salary, date_of_joining: $date_of_joining, department: $department, employee_photo: $employee_photo) {
          id
        }
      }
    `;

    const variables = { ...emp, employee_photo: null };

    if (file) {
      // Handles sending the image file to the backend
      const formData = new FormData();
      formData.append('operations', JSON.stringify({ query, variables }));
      formData.append('map', JSON.stringify({ '0': ['variables.employee_photo'] }));
      formData.append('0', file, file.name);

      return this.http.post<any>(this.url, formData, { headers: this.getHeaders() });
    } else {
      return this.http.post<any>(this.url, { query, variables }, { headers: this.getHeaders() });
    }
  }

  // 8. UPDATE EMPLOYEE (With optional Photo Upload)
  updateEmployee(id: string, emp: any, file: File | null = null) {
    const query = `
      mutation UpdateEmployee($id: ID!, $designation: String, $department: String, $salary: Float, $employee_photo: Upload) {
        updateEmployee(id: $id, designation: $designation, department: $department, salary: $salary, employee_photo: $employee_photo) {
          id
        }
      }
    `;
    
    const variables = { id, ...emp, employee_photo: null };

    if (file) {
      const formData = new FormData();
      formData.append('operations', JSON.stringify({ query, variables }));
      formData.append('map', JSON.stringify({ '0': ['variables.employee_photo'] }));
      formData.append('0', file, file.name);
      
      return this.http.post<any>(this.url, formData, { headers: this.getHeaders() });
    } else {
      return this.http.post<any>(this.url, { query, variables }, { headers: this.getHeaders() });
    }
  }

  // 9. DELETE EMPLOYEE
  deleteEmployee(id: string) {
    return this.http.post<any>(this.url, {
      query: `
        mutation DeleteEmployee($id: ID!) { 
          deleteEmployee(id: $id) 
        }
      `,
      variables: { id }
    }, { headers: this.getHeaders() });
  }
}