import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-firm-form',
  templateUrl: './firm-form.component.html',
  styleUrls: ['./firm-form.component.css'],
})
export class FirmFormComponent implements OnInit {
  firm?: any;

  theForm = new FormGroup({
    name: new FormControl(this.firm?.name, [Validators.required]),
    identifier: new FormControl(this.firm?.identifier, [Validators.required]),
    sharingPercentage: new FormControl(this.firm?.sharingPercentage),
    whitelableInfo: new FormGroup({
      url: new FormControl(''),
      mailSenderAddress: new FormControl(''),
      mailSenderName: new FormControl(''),
    }),
    managers: new FormArray([]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.http
        .get(`https://dev.innov.id/bara-mcp/public/api/v1/firms/${id}`)
        .subscribe({
          next: (response: any) => {
            console.log(response.data);
            this.firm = response.data;

            this.theForm.patchValue({
              name: this.firm.name,
              identifier: this.firm.identifier,
              sharingPercentage: this.firm.sharingPercentage,
            });

            this.firm.managers.forEach((manager: any) => {
              this.managers.push(
                new FormGroup({
                  id: new FormControl(manager.id),
                  name: new FormControl(manager.name),
                  email: new FormControl(manager.email),
                  phone: new FormControl(manager.phone),
                })
              );
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.addManager();
    }
  }

  get managers() {
    return this.theForm?.get('managers') as FormArray;
  }

  addManager() {
    this.managers.push(
      new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
      })
    );
  }

  removeManager(index: number) {
    this.managers.removeAt(index);
  }

  submit() {
    // const data = this.theForm.value;
    const data = {
      name: 'Oden',
      identifier: 'oden123',
      sharingPercentage: 2.5,
      whitelableInfo: {
        url: 'https://oden.org',
        mailSenderAddress: 'noreply@oden.org',
        mailSenderName: 'oden team',
      },
      managers: [
        {
          name: ' Nirmala Ruslan ',
          email: 'ruslan@oden.org',
          password: 'iousehr12312k3j',
          phone: '081323211233',
        },
        {
          name: ' Cahaya Guntur',
          email: 'guntur@oden.org',
          password: 'iousehr12312k3j',
          phone: '081323211233',
        },
      ],
    };

    this.http
      .post(
        'https://dev.innov.id/bara-mcp/public/api/v1/firms',
        JSON.stringify(data)
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
