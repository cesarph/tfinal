import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { InicioComponent } from './inicio/inicio.component';
import {PersonalComponent} from './inicio/personal/personal.component';
import {PostersComponent} from './inicio/posters/posters.component';
import {TranslatorComponent} from './inicio/translator/translator.component';
import { AreasComponent } from './inicio/areas/areas.component';
import { ChatbotComponent } from './inicio/chatbot/chatbot.component';





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
    path: 'translator',
    component: TranslatorComponent,
    data: { title: 'Traductor' }
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
    path: 'chatbot',
    component: ChatbotComponent,
    data: { title: 'chatbot' }
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
