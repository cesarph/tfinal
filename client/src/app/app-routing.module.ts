import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { InicioComponent } from './inicio/inicio.component';
import {PersonalComponent} from './inicio/personal/personal.component';
import {PostersComponent} from './inicio/posters/posters.component';
import {TextToAudioComponent} from './inicio/text-to-audio/text-to-audio.component';
import { AreasComponent } from './inicio/areas/areas.component';





export const appRoutes: Routes = [
	{
    path: '', 
    component: InicioComponent,
    pathMatch: 'full',
  },
  
  {
    path: 'areas',
    component: AreasComponent,
    data: { title: 'AreasComida' }
  },
  {
    path: 'text-to-audio',
    component: TextToAudioComponent,
    data: { title: 'TextAudio' }
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
