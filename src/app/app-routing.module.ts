import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { LandingComponent } from './component/landing/landing.component';
import { RegistarUsuarioComponent } from './component/registar-usuario/registar-usuario.component';
const routes: Routes = [
  {
    path: '',
     component:LandingComponent,
     //redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  { path: 'registrar-usuario', component: RegistarUsuarioComponent},
  {
    path: 'components',
    loadChildren: () => import('./component/component.module').then((m) => m.ComponentModule),
  },
  // {
  //   path:'' ,component:LandingComponent,

  // },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
