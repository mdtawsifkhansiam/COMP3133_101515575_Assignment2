import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-employee.html'
})
export class ViewEmployee implements OnInit {
  employee: any = null;

  constructor(
    private gql: GraphqlService, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gql.getEmployeeById(id).subscribe((res: any) => {
        // Cleaned line: removed the [cite] tag that caused the error
        this.employee = res.data?.getEmployeeById;
        this.cdr.detectChanges();
      });
    }
  }
}