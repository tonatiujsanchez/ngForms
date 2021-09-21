import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { ModelComponent } from './model/model.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'model'
  },
  {
    path:'template', 
    component: TemplateComponent
  },
  {
    path:'model', 
    component: ModelComponent
  },
  {
    path: '**',
    redirectTo: 'model'
  }
];



@NgModule({
  imports: [ RouterModule.forRoot( routes )],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
