import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmFormComponent } from './firm-form/firm-form.component';
import { FirmListComponent } from './firm-list/firm-list.component';

const routes: Routes = [
  {
    path: '',
    component: FirmListComponent,
  },
  {
    path: 'firms/add',
    component: FirmFormComponent,
  },
  {
    path: 'firms/edit/:id',
    component: FirmFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
