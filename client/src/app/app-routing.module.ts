import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { InicioComponent } from './inicio/inicio.component';
import {PersonalComponent} from './inicio/personal/personal.component';
import {PostersComponent} from './inicio/posters/posters.component';




export const appRoutes: Routes = [
	{
    path: '', 
    component: InicioComponent,
    pathMatch: 'full',
  },
  {
    path: 'personal',
    component: PersonalComponent,
    data: { title: 'Personal' }
  },
  {
    path: 'posters',
    component: PostersComponent,
    data: { title: 'posters' }
  },
  {
    "path": "**",
    "redirectTo": '/'
}
];

@NgModule({
	imports: [
    RouterModule.forRoot(
      appRoutes,
      { 
    		enableTracing: false,
    		useHash: false
      } 
    )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
