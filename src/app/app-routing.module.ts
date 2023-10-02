import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthModule } from './auth/auth.module';
import { Error404PageComponent } from './share/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [

  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ]
  },
  {
    path:'dashboard',
    loadChildren:()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
