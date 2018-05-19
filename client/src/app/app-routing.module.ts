import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { InicioComponent } from './inicio/inicio.component';




export const appRoutes: Routes = [
	{
    path: '', 
    component: InicioComponent,
    pathMatch: 'full',
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
