import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private url = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  // GET ALL EMPLOYEES
  getAllEmployees() {
  return this.http.post<any>(this.url, {
    query: `
      query {
        getAllEmployees {
          id
          first_name
          last_name
          email
        }
      }
    `
  });
}

  // ADD EMPLOYEE
  addEmployee(emp: any) {
    return this.http.post<any>(this.url, {
      query: `
        mutation {
          addEmployee(
            first_name: "${emp.first_name}",
            last_name: "${emp.last_name}",
            email: "${emp.email}",
            designation: "${emp.designation}",
            salary: ${emp.salary},
            date_of_joining: "${emp.date_of_joining}",
            department: "${emp.department}"
          ) {
            id
          }
        }
      `
    });
  }

  // DELETE
  deleteEmployee(id: string) {
    return this.http.post<any>(this.url, {
      query: `
        mutation {
          deleteEmployee(id: "${id}")
        }
      `
    });
  }

  // UPDATE
  updateEmployee(id: string, emp: any) {
    return this.http.post<any>(this.url, {
      query: `
        mutation {
          updateEmployee(
            id: "${id}",
            first_name: "${emp.first_name}",
            last_name: "${emp.last_name}",
            email: "${emp.email}",
            designation: "${emp.designation}",
            salary: ${emp.salary},
            date_of_joining: "${emp.date_of_joining}",
            department: "${emp.department}"
          ) {
            id
          }
        }
      `
    });
  }
}