import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firm-list',
  templateUrl: './firm-list.component.html',
  styleUrls: ['./firm-list.component.css'],
})
export class FirmListComponent implements OnInit {
  firms: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://dev.innov.id/bara-mcp/public/api/v1/firms')
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.firms = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
